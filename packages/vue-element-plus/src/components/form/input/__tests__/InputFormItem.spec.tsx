import type { InputFormItem } from '@cphayim-enc/base'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

import { EncInputFormItem } from '..'

describe(`CascaderFormItem.vue`, () => {
  const DEFAULT_ITEM: InputFormItem = {
    type: 'input',
    name: 'name',
    label: '名称',
  }

  it(`should be sync value`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item} />)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
    expect(input.element.value).toBe('')

    input.setValue('test')
    expect(modelValue.value).toBe('test')

    modelValue.value = 'test2'
    await nextTick()
    expect(input.element.value).toBe('test2')
  })

  it(`should be able to show placeholder`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item.value} />)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('请输入')

    item.value.placeholder = '请输入名称'
    await nextTick()
    expect(input.attributes('placeholder')).toBe('请输入名称')
  })

  it(`should be able to support different input types`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({
      ...DEFAULT_ITEM,
      inputType: 'text',
    })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item.value} />)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')

    item.value.inputType = 'password'
    await nextTick()
    expect(input.attributes('type')).toBe('password')

    item.value.inputType = 'number'
    await nextTick()
    expect(input.attributes('type')).toBe('number')

    item.value.inputType = 'textarea'
    await nextTick()
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it(`should be able to support textarea rows`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({
      ...DEFAULT_ITEM,
      inputType: 'textarea',
    })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item.value} />)
    const textarea = wrapper.find('textarea')

    expect(textarea.exists()).toBe(true)
    expect(textarea.element.rows).toBe(4) // default rows

    item.value.inputRows = 10
    await nextTick()
    expect(textarea.element.rows).toBe(10)
  })
})
