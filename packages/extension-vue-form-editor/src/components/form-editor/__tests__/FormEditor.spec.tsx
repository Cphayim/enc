import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncFormEditor } from '..'

describe('FormEditor.vue', () => {
  it('should be render correct mode', () => {
    const wrapper = mount(() => <EncFormEditor />)
    // default mode is visual
    expect(wrapper.findComponent({ name: 'EncVisualFormEditor' }).exists()).toBe(true)

    const wrapper2 = mount(() => <EncFormEditor config={{ mode: 'code' }} />)
    expect(wrapper2.findComponent({ name: 'EncCodeFormEditor' }).exists()).toBe(true)
  })
})
