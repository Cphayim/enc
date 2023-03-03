import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { EncFormEditorTip } from '..'

describe('FormEditorTip.vue', () => {
  it('should render single tip', () => {
    const wrapper = mount(() => <EncFormEditorTip content={'提示内容提示内容'} />)
    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.find('li').text()).toBe('提示内容提示内容')
  })

  it('should render multiple tips', () => {
    const wrapper = mount(() => (
      <EncFormEditorTip content={['提示内容1', '提示内容2', '提示内容3']} />
    ))
    const tips = wrapper.findAll('li')
    expect(tips.length).toBe(3)
    for (let i = 0; i < tips.length; i++) {
      expect(tips[i].text()).toBe(`提示内容${i + 1}`)
    }
  })
})
