import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncFormEditor } from '..'

describe('FormEditor.vue', () => {
  it('should be render correct mode', () => {
    const wrapper = mount(() => <EncFormEditor />)
    // default mode is visual
    const visualFormEditor = wrapper.findComponent({ name: 'EncVisualFormEditor' })
    expect(visualFormEditor.exists()).toBe(true)

    const wrapper2 = mount(() => <EncFormEditor config={{ mode: 'code' }} />)
    const codeFormEditor = wrapper2.findComponent({ name: 'EncCodeFormEditor' })
    expect(codeFormEditor.exists()).toBe(true)
  })
})
