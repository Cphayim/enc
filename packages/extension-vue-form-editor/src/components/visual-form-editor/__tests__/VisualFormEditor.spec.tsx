import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncVisualFormEditor } from '..'
import { EncVisualFormEditorLeftPanel } from '../left-panel'
import { EncVisualFormEditorCenterPanel } from '../center-panel'
import { EncVisualFormEditorRightPanel } from '../right-panel'

describe('EncVisualFormEditor.vue', () => {
  it('should render all three panels correctly', () => {
    const wrapper = mount(() => <EncVisualFormEditor items={[]} />)

    expect(wrapper.findComponent(EncVisualFormEditorLeftPanel).exists()).toBe(true)
    expect(wrapper.findComponent(EncVisualFormEditorCenterPanel).exists()).toBe(true)
    expect(wrapper.findComponent(EncVisualFormEditorRightPanel).exists()).toBe(true)
  })
})
