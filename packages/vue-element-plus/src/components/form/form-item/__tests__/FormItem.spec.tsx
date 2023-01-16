import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { FormItemUnion } from '@cphayim-enc/base'
import { EncFormItem } from '..'

describe('FormItem.vue', () => {
  it('should be able render correct form-item component', () => {
    const map: Record<FormItemUnion['type'], string> = {
      input: 'EncInputFormItem',
      select: 'EncSelectFormItem',
      cascader: 'EncCascaderFormItem',
      date: 'EncDateFormItem',
      time: 'EncTimeFormItem',
      upload: 'EncUploadFormItem',
      switch: 'EncSwitchFormItem',
      radio: 'EncRadioFormItem',
      checkbox: 'EncCheckboxFormItem',
      custom: '', // custom 没有对应的实现
    }

    for (const [type, componentName] of Object.entries(map)) {
      const wrapper = mount(() => (
        <EncFormItem
          item={{ type: type as FormItemUnion['type'], name: 'test', label: `Test ${type}` }}
        />
      ))

      // correct render label
      expect(wrapper.html()).contain(`Test ${type}`)

      if (type !== 'custom') {
        // correct render component
        expect(wrapper.findComponent({ name: componentName }).exists()).toBe(true)
      }
    }
  })

  it('should be render slot content', () => {
    const inputWrapper = mount(() => (
      <EncFormItem
        item={{ type: 'input', name: 'test', label: 'Test input' }}
        v-slots={{
          default: () => <div class="test-slot">Test slot</div>,
        }}
      />
    ))
    expect(inputWrapper.findComponent({ name: 'EncInputFormItem' }).exists()).toBe(false)
    expect(inputWrapper.find('.test-slot').exists()).toBe(true)

    const customWrapper = mount(() => (
      <EncFormItem
        item={{ type: 'custom', name: 'test', label: 'Test custom' }}
        v-slots={{
          default: () => <div class="test-slot">Test slot</div>,
        }}
      />
    ))
    expect(customWrapper.find('.test-slot').exists()).toBe(true)
  })
})
