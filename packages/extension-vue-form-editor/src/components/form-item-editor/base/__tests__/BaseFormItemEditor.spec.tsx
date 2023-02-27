import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { FormItemUnion } from '@cphayim-enc/base'
import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { createTestMockEncForm } from '../../../../__tests__/mock-enc-form'
import { EncBaseFormItemEditor } from '..'

const createItem = (): FormItemUnion => {
  return {
    name: 'test',
    label: 'Test',
    type: 'input',
  }
}

const createConfig = (randomNameOnly = false): VisualFormEditorConfig => {
  return {
    mode: 'visual',
    randomNameOnly,
    encFormComponent: createTestMockEncForm(),
  }
}

describe('BaseFormItemEditor.vue', () => {
  it('should render', () => {
    const modelValue = createItem()
    const wrapper = mount(() => (
      <EncBaseFormItemEditor v-model={modelValue} config={createConfig()} />
    ))

    const encForm = wrapper.findComponent({ name: 'EncForm' })
    expect(encForm.exists()).toBe(true)
  })
})
