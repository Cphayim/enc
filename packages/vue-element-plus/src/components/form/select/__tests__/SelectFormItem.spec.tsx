import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import type { SelectFormItem } from '@cphayim-enc/base'
import { EncSelectFormItem } from '..'

describe(`SelectFormItem.vue`, () => {
  const DEFAULT_ITEM: SelectFormItem = {
    type: 'select',
    name: 'color',
    label: 'Color',
    selectOptions: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
    ],
  }

  it(`should be able to sync value`, async () => {
    const modelValue = ref()
    const item = ref<SelectFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncSelectFormItem v-model={modelValue.value} item={item.value} />)

    await nextTick()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.el-select-v2__placeholder').exists()).toBe(true)
    expect(wrapper.find('.el-select-v2__placeholder').text()).toBe('请选择')

    item.value.placeholder = '请选择颜色'
    await nextTick()
    expect(wrapper.find('.el-select-v2__placeholder').exists()).toBe(true)
    expect(wrapper.find('.el-select-v2__placeholder').text()).toBe('请选择颜色')

    modelValue.value = 'green'
    await nextTick()
    expect(wrapper.find('.el-select-v2__placeholder').text()).toBe('Green')
  })

  it(`should be able to sync value with multiple`, async () => {
    const modelValue = ref()
    const item = ref<SelectFormItem>({ ...DEFAULT_ITEM, selectMultiple: true })

    const wrapper = mount(() => <EncSelectFormItem v-model={modelValue.value} item={item.value} />)

    await nextTick()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.el-select-v2__placeholder').exists()).toBe(true)
    expect(wrapper.find('.el-select-v2__placeholder').text()).toBe('请选择')

    modelValue.value = []
    await nextTick()
    expect(wrapper.find('.el-select-v2__placeholder').exists()).toBe(true)
    expect(wrapper.find('.el-select-v2__placeholder').text()).toBe('请选择')

    modelValue.value = ['red']
    await nextTick()
    expect(wrapper.findAll('.el-tag').length).toBe(1)
    expect(wrapper.findAll('.el-tag')[0].text()).toBe('Red')

    modelValue.value = ['red', 'green']
    await nextTick()
    expect(wrapper.findAll('.el-tag').length).toBe(2)
    expect(wrapper.findAll('.el-tag')[0].text()).toBe('Red')
    expect(wrapper.findAll('.el-tag')[1].text()).toBe('Green')
  })
})
