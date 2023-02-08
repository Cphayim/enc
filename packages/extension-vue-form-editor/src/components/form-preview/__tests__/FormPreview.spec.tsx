import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { EncFormPreview } from '..'
import { defineComponent } from 'vue'

describe('FormPreview.vue', () => {
  it('should be render preview', () => {
    const EncForm = defineComponent({
      name: 'EncForm',
      template: '<div>EncForm</div>',
    })

    const wrapper = mount(() => <EncFormPreview encFormComponent={EncForm} />)
    const encForm = wrapper.findComponent({ name: 'EncForm' })
    expect(encForm.exists()).toBe(true)
    expect(wrapper.text()).toContain('EncForm')
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
})
