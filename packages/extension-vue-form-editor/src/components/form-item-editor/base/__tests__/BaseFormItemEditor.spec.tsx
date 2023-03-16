import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

import type { BaseFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { createTestMockEncForm } from '../../../../__tests__/mock-enc-form'
import { BASE_ITEMS } from '../items'
import { EncBaseFormItemEditor } from '..'

const createItem = () => {
  return ref<BaseFormItem>({
    name: 'test',
    label: 'Test',
    type: 'input',
  })
}

const createConfig = (randomNameOnly = false): FormEditorConfig => {
  return {
    mode: 'visual',
    randomNameOnly,
    encFormComponent: createTestMockEncForm(),
  }
}

describe('BaseFormItemEditor.vue', () => {
  it('should render EncForm', () => {
    const modelValue = createItem()
    const wrapper = mount(() => (
      <EncBaseFormItemEditor v-model={modelValue.value} config={createConfig()} />
    ))

    const encForm = wrapper.findComponent({ name: 'EncForm' })
    expect(encForm.exists()).toBe(true)

    expect(encForm.props().data).toBeDefined()
    expect(encForm.props().items).toBeDefined()

    encForm.vm.updateValueByName('label', 'Test2')
    expect(modelValue.value.label).toBe('Test2')
  })
})
