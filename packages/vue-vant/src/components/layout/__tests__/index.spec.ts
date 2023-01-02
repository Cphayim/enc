import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncLayout } from '..'

it('should be able to mount component', () => {
  const wrapper = mount(EncLayout, { props: { msg: '124' } })
  expect(wrapper.html()).toMatchSnapshot()
  expect(wrapper.get('div').text()).toBe('124')
})
