import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, PropType, ref } from 'vue'

import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { createTestMockEncForm } from '../../__tests__/mock-enc-form'
import { useEditorItems } from '../use-editor-items'

const Comp = defineComponent({
  props: {
    config: {
      type: Object as PropType<VisualFormEditorConfig>,
      required: true,
    },
  },
  setup(props) {
    const data = ref({})
    const { EncForm, formItems, formRef } = useEditorItems([], props.config)
    return {
      EncForm,
      formItems,
      data,
      formRef,
    }
  },
  render() {
    const { EncForm, formItems, data } = this
    return <EncForm v-model:data={data} items={formItems} ref="formRef" />
  },
})

describe('useEditorItems', () => {
  it('should be throw error when not passed config.encFormComponent', () => {
    expect(() => mount(Comp, { props: { config: { mode: 'visual' } } })).toThrow(
      'props encFormComponent must be a EncForm component',
    )
  })

  it('should be render EncForm', () => {
    const wrapper = mount(() => (
      <Comp config={{ mode: 'visual', encFormComponent: createTestMockEncForm() }} />
    ))
    expect(wrapper.findComponent({ name: 'EncForm' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'EncForm' }).vm.data).toEqual({})
    expect(wrapper.findComponent({ name: 'EncForm' }).vm.items).toEqual([])
  })

  it('should be call encForm.validate on mounted', () => {
    const validate = vi.fn()
    const wrapper = mount(() => (
      <Comp config={{ mode: 'visual', encFormComponent: createTestMockEncForm({ validate }) }} />
    ))
    expect(wrapper.findComponent({ name: 'EncForm' }).exists()).toBe(true)
    expect(validate).toBeCalled()
  })
})
