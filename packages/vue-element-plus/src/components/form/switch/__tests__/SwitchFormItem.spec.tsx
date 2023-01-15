import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { ElSwitch } from 'element-plus'

import type { SwitchFormItem } from '@cphayim-enc/base'
import { EncSwitchFormItem } from '..'

describe('SwitchFormItem.vue', () => {
  const DEFAULT_ITEM: SwitchFormItem = {
    type: 'switch',
    name: 'logs',
    label: 'Enable Logs',
  }

  it('should be able to sync value', async () => {
    const modelValue = ref()
    const item = ref<SwitchFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncSwitchFormItem v-model={modelValue.value} item={item.value} />)

    const elSwitchRef = wrapper.findComponent(ElSwitch)
    expect(elSwitchRef.exists()).toBe(true)

    await elSwitchRef.find('.el-switch__core').trigger('click')
    expect(modelValue.value).toBe(true)

    await elSwitchRef.find('.el-switch__core').trigger('click')
    expect(modelValue.value).toBe(false)
  })

  it('should be using custom value', async () => {
    const modelValue = ref()
    const item = ref<SwitchFormItem>({
      ...DEFAULT_ITEM,
      switchActiveValue: 'on',
      switchInactiveValue: 'off',
    })

    const wrapper = mount(() => <EncSwitchFormItem v-model={modelValue.value} item={item.value} />)

    const elSwitchRef = wrapper.findComponent(ElSwitch)
    expect(elSwitchRef.exists()).toBe(true)

    await elSwitchRef.find('.el-switch__core').trigger('click')
    expect(modelValue.value).toBe('on')

    await elSwitchRef.find('.el-switch__core').trigger('click')
    expect(modelValue.value).toBe('off')
  })

  it('should be using custom label', async () => {
    const modelValue = ref()
    const item = ref<SwitchFormItem>({
      ...DEFAULT_ITEM,
      switchActiveText: 'ON',
      switchInactiveText: 'OFF',
    })

    const wrapper = mount(() => <EncSwitchFormItem v-model={modelValue.value} item={item.value} />)

    expect(wrapper.html()).toContain('ON')
    expect(wrapper.html()).toContain('OFF')
  })
})
