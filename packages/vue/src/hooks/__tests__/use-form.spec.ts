import { describe, expect, it } from 'vitest'
import { isRef } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'

import { useForm } from '../use-form'

describe('useForm', () => {
  const items: FormItemUnion[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      name: 'age',
      label: '年龄',
      type: 'input',
    },
  ]

  it('should be combined useFormData and useFormItems', () => {
    const { formData, resetData, formItems, getItem, updateItem } = useForm(
      { name: 'enc', age: 18 },
      items,
    )
    expect(isRef(formData)).toBe(true)
    expect(resetData).toBeDefined()
    expect(isRef(formItems)).toBe(true)
    expect(getItem).toBeDefined()
    expect(updateItem).toBeDefined()
  })
})
