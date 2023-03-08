import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncEditorFieldset } from '..'

describe('EditorFieldset.vue', () => {
  it('should render fieldset and legend', () => {
    const wrapper = mount(() => <EncEditorFieldset title="标题" />)
    expect(wrapper.find('fieldset').exists()).toBe(true)
    expect(wrapper.find('legend').exists()).toBe(true)
    expect(wrapper.find('legend').text()).toBe('标题')
  })

  it('should be able to render the default slot', () => {
    const wrapper = mount(() => (
      <EncEditorFieldset title="标题">
        <div class="child">child</div>
      </EncEditorFieldset>
    ))
    expect(wrapper.find('.child').exists()).toBe(true)
    expect(wrapper.find('.child').text()).toBe('child')
  })

  it('should be able to render the title slot', () => {
    const wrapper = mount(() => (
      <EncEditorFieldset
        title="标题"
        v-slots={{
          default: () => <div class="child">child</div>,
          title: () => <div class="title">title</div>,
        }}
      ></EncEditorFieldset>
    ))

    expect(wrapper.find('.child').exists()).toBe(true)
    expect(wrapper.find('.child').text()).toBe('child')

    expect(wrapper.find('legend').exists()).toBe(true)
    expect(wrapper.find('legend').text()).not.contain('标题')
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe('title')
  })
})
