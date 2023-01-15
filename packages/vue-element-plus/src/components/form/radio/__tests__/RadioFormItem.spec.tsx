import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'

import type { RadioFormItem } from '@cphayim-enc/base'
import { EncRadioFormItem } from '..'

describe('RadioFormItem.vue', () => {
  const DEFAULT_ITEM: RadioFormItem = {
    type: 'radio',
    name: 'tags',
    label: 'Tags',
    radioOptions: [
      { label: 'Tag 1', value: 'tag1' },
      { label: 'Tag 2', value: 'tag2' },
      'Tag3', //
    ],
  }

  it('should able be to sync value with radio group', async () => {
    const modelValue = ref()
    const item = ref<RadioFormItem>({ ...DEFAULT_ITEM })

    const wrapper = mount(() => <EncRadioFormItem v-model={modelValue.value} item={item.value} />)

    const elRadioGroupRef = wrapper.findComponent(ElRadioGroup)
    expect(elRadioGroupRef.exists()).toBe(true)

    const elRadioRefs = elRadioGroupRef.findAllComponents(ElRadio)
    expect(elRadioRefs.length).toBe(3)

    modelValue.value = 'tag1'
    await nextTick()
    expect(elRadioRefs[0].classes()).toContain('is-checked')

    await elRadioRefs[1].find('input').setValue(true)
    expect(modelValue.value).toBe('tag2')
    expect(elRadioRefs[0].classes()).not.toContain('is-checked')
    expect(elRadioRefs[1].classes()).toContain('is-checked')
    expect(elRadioRefs[2].classes()).not.toContain('is-checked')

    await elRadioRefs[2].find('input').setValue(true)
    expect(modelValue.value).toBe('Tag3')
    expect(elRadioRefs[0].classes()).not.toContain('is-checked')
    expect(elRadioRefs[1].classes()).not.toContain('is-checked')
    expect(elRadioRefs[2].classes()).toContain('is-checked')
  })
})
