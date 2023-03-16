import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

import { EncFormPreview } from '..'

describe('FormPreview.vue', () => {
  const EncForm = defineComponent({
    name: 'EncForm',
    props: ['data', 'items'],
    template: '<div>EncForm</div>',
  })

  it('should be render preview', () => {
    const wrapper = mount(() => <EncFormPreview encFormComponent={EncForm} />)
    const encForm = wrapper.findComponent({ name: 'EncForm' })
    expect(encForm.exists()).toBe(true)
    expect(wrapper.text()).toContain('EncForm')

    // pass the necessary props (data, items) to EncForm
    expect(encForm.props('data')).toBeDefined()
    expect(encForm.props('items')).toBeDefined()
  })

  it('should be throw error when encFormComponent is not a encForm component', () => {
    expect(() => mount(() => <EncFormPreview encFormComponent={undefined} />)).toThrow(
      'props encFormComponent must be a EncForm component',
    )

    const NotEncForm = defineComponent({
      name: 'NotEncForm',
      template: '<div>NotEncForm</div>',
    })
    expect(() => mount(() => <EncFormPreview encFormComponent={NotEncForm} />)).toThrow(
      'props encFormComponent must be a EncForm component',
    )
  })

  it('should be able to pass extra props to EncForm', () => {
    const wrapper = mount(() => (
      <EncFormPreview encFormComponent={EncForm} encFormProps={{ extra: 'extra' }} />
    ))
    const encForm = wrapper.findComponent({ name: 'EncForm' })

    expect(encForm.attributes('extra')).toBe('extra')
  })
})
