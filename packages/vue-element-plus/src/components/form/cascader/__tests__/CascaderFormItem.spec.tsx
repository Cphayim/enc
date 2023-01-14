import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

import type { CascaderFormItem } from '@cphayim-enc/base'
import { EncCascaderFormItem } from '..'

describe(`CascaderFormItem.vue`, () => {
  const DEFAULT_ITEM: CascaderFormItem = {
    type: 'cascader',
    name: 'room',
    label: '房间',
    cascaderOptions: [
      {
        label: 'A',
        value: 'A',
        children: [
          {
            label: '1F',
            value: 'A-1F',
            children: [
              { label: '101', value: 'A-1F-101' },
              { label: '102', value: 'A-1F-102' },
            ],
          },
          {
            label: '2F',
            value: 'A-2F',
            children: [
              { label: '201', value: 'A-2F-201' },
              { label: '202', value: 'A-2F-202' },
            ],
          },
        ],
      },
      {
        label: 'B',
        value: 'B',
        children: [
          {
            label: '1F',
            value: 'B-1F',
            children: [
              { label: '101', value: 'B-1F-101' },
              { label: '102', value: 'B-1F-102' },
            ],
          },
          {
            label: '2F',
            value: 'B-2F',
            children: [
              { label: '201', value: 'B-2F-201' },
              { label: '202', value: 'B-2F-202' },
            ],
          },
        ],
      },
    ],
  }

  it(`should be able to sync value`, async () => {
    const modelValue = ref()
    const item = ref<CascaderFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => (
      <EncCascaderFormItem v-model={modelValue.value} item={item.value} />
    ))

    await nextTick()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.placeholder).toBe('请选择')

    modelValue.value = 'A-1F-101'
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('A / 1F / 101')

    modelValue.value = 'B-2F-202'
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('B / 2F / 202')

    modelValue.value = 'B-2F-203' // value not in options
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('')
  })

  it(`should be able to sync value with emit paths`, async () => {
    const modelValue = ref()
    const item = ref<CascaderFormItem>({ ...DEFAULT_ITEM, cascaderEmitPath: true })

    const wrapper = mount(() => (
      <EncCascaderFormItem v-model={modelValue.value} item={item.value} />
    ))

    await nextTick()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.placeholder).toBe('请选择')

    modelValue.value = ['A', 'A-1F', 'A-1F-101']
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('A / 1F / 101')

    modelValue.value = ['B', 'B-2F', 'B-2F-202']
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('B / 2F / 202')
  })

  it(`should be able to sync value with multiple`, async () => {
    const modelValue = ref()
    const item = ref<CascaderFormItem>({ ...DEFAULT_ITEM, cascaderMultiple: true })

    const wrapper = mount(() => (
      <EncCascaderFormItem v-model={modelValue.value} item={item.value} />
    ))

    await nextTick()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.placeholder).toBe('请选择')

    modelValue.value = ['A-1F-101']
    await nextTick()
    expect(wrapper.findAll('.el-tag').length).toBe(1)
    expect(wrapper.findAll('.el-tag')[0].text()).toBe('A / 1F / 101')

    modelValue.value = ['A-1F-101', 'B-2F-202']
    await nextTick()
    expect(wrapper.findAll('.el-tag').length).toBe(2)
    expect(wrapper.findAll('.el-tag')[0].text()).toBe('A / 1F / 101')
    expect(wrapper.findAll('.el-tag')[1].text()).toBe('B / 2F / 202')
  })

  it(`should be able to sync value with multiple and emit paths`, async () => {
    const modelValue = ref()
    const item = ref<CascaderFormItem>({
      ...DEFAULT_ITEM,
      cascaderMultiple: true,
      cascaderEmitPath: true,
    })

    const wrapper = mount(() => (
      <EncCascaderFormItem v-model={modelValue.value} item={item.value} />
    ))

    await nextTick()
    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.placeholder).toBe('请选择')

    modelValue.value = [['A', 'A-1F', 'A-1F-101']]
    await nextTick()
    expect(wrapper.findAll('.el-tag').length).toBe(1)
    expect(wrapper.findAll('.el-tag')[0].text()).toBe('A / 1F / 101')

    modelValue.value = [
      ['A', 'A-1F', 'A-1F-101'],
      ['B', 'B-2F', 'B-2F-202'],
    ]
    await nextTick()
    expect(wrapper.findAll('.el-tag').length).toBe(2)
    expect(wrapper.findAll('.el-tag')[0].text()).toBe('A / 1F / 101')
    expect(wrapper.findAll('.el-tag')[1].text()).toBe('B / 2F / 202')
  })
})
