import type { FormItemUnion } from '@cphayim-enc/base'
import { describe, expect, it } from 'vitest'
import { isRef, nextTick, ref, watchEffect } from 'vue'

import { useFormItems } from '../use-form-items'

describe('useFormItems', () => {
  const items: FormItemUnion[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      name: 'language',
      label: '编程语言',
      type: 'select',
    },
  ]

  it('should return ref formItems and ref formItemsMap', () => {
    const { formItems } = useFormItems(items)

    expect(isRef(formItems)).toBe(true)
    expect(formItems.value).toEqual(items)
  })

  it('should getItem by name', () => {
    const { getItem } = useFormItems(items)
    expect(getItem('name')).toEqual(items[0])
    expect(getItem('language')).toEqual(items[1])
    expect(getItem('not-exist')).toBeUndefined()
  })

  it('should updateItem by name', () => {
    const { updateItem, getItem } = useFormItems(items)
    updateItem('name', { label: '姓名1' })
    expect(getItem('name')!.label).toBe('姓名1')

    // update not exist name should throw error
    try {
      updateItem('not-exist', { label: '姓名1' })
    } catch (error) {
      expect(error.message).toContain('updateItem not found name: not-exist')
    }
  })

  it('should auto update when the passed ref changes', async () => {
    const itemsRef = ref(items)

    const { getItem } = useFormItems(itemsRef)
    expect(getItem('name')).toBeDefined()
    expect(getItem('language')).toBeDefined()
    expect(getItem('age')).toBeUndefined()

    itemsRef.value = [
      {
        name: 'name',
        label: '姓名',
        type: 'input',
      },
      {
        name: 'age',
        label: '年龄',
        type: 'input',
      },
    ]

    await nextTick()
    expect(getItem('name')).toBeDefined()
    expect(getItem('language')).toBeUndefined()
    expect(getItem('age')).toBeDefined()

    itemsRef.value[0].label = '姓名1'
    await nextTick()
    expect(getItem('name')!.label).toBe('姓名1')
  })
})
