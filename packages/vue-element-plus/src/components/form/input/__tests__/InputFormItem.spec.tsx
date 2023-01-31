import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

import type { InputFormItem } from '@cphayim-enc/base'
import { EncInputFormItem } from '..'

describe(`InputFormItem.vue`, () => {
  const DEFAULT_ITEM: InputFormItem = {
    type: 'input',
    name: 'name',
    label: '名称',
  }

  it(`should be sync value`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item} />)
    const inputRef = wrapper.find('input')

    expect(inputRef.exists()).toBe(true)
    expect(inputRef.attributes('type')).toBe('text')
    expect(inputRef.element.value).toBe('')

    inputRef.setValue('test')
    expect(modelValue.value).toBe('test')

    modelValue.value = 'test2'
    await nextTick()
    expect(inputRef.element.value).toBe('test2')
  })

  it(`should be able to show placeholder`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item.value} />)
    const inputRef = wrapper.find('input')

    expect(inputRef.exists()).toBe(true)
    expect(inputRef.attributes('placeholder')).toBe('请输入')

    item.value.placeholder = '请输入名称'
    await nextTick()
    expect(inputRef.attributes('placeholder')).toBe('请输入名称')
  })

  it(`should be able to support different input types`, async () => {
    const modelValue = ref('')
    const item = ref<InputFormItem>({
      ...DEFAULT_ITEM,
      inputType: 'text',
    })

    const wrapper = mount(() => <EncInputFormItem v-model={modelValue.value} item={item.value} />)
    const inputRef = wrapper.find('input')

    expect(inputRef.exists()).toBe(true)
    expect(inputRef.attributes('type')).toBe('text')

    item.value.inputType = 'password'
    await nextTick()
    expect(inputRef.attributes('type')).toBe('password')

    item.value.inputType = 'number'
    await nextTick()
    expect(inputRef.attributes('type')).toBe('number')

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
    const textareaRef = wrapper.find('textarea')

    expect(textareaRef.exists()).toBe(true)
    expect(textareaRef.element.rows).toBe(4) // default rows

    item.value.inputRows = 10
    await nextTick()
    expect(textareaRef.element.rows).toBe(10)
  })
})
