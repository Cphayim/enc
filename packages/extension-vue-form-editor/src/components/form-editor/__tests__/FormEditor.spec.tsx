import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncFormEditor } from '..'

describe('FormEditor.vue', () => {
  it('should be render correct mode', () => {
    const wrapper = mount(() => <EncFormEditor config={{}} />)
    // default mode is visual
    const visualFormEditor = wrapper.findComponent({ name: 'EncFormEditorEditPanel' })
    expect(visualFormEditor.exists()).toBe(true)
  })
})
