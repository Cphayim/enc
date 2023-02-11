import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncVisualFormEditor } from '..'
import LeftWidgetPanel from '../_internals/LeftWidgetPanel.vue'
import CenterMainPanel from '../_internals/CenterMainPanel.vue'
import RightDetailPanel from '../_internals/RightDetailPanel.vue'

describe('EncVisualFormEditor.vue', () => {
  it('should render all three panels correctly', () => {
    const wrapper = mount(() => <EncVisualFormEditor />)

    expect(wrapper.findComponent(LeftWidgetPanel).exists()).toBe(true)
    expect(wrapper.findComponent(CenterMainPanel).exists()).toBe(true)
    expect(wrapper.findComponent(RightDetailPanel).exists()).toBe(true)
  })
})
