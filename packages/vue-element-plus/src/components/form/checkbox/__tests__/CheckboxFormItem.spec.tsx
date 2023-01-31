import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'

import type { CheckboxFormItem } from '@cphayim-enc/base'
import { EncCheckboxFormItem } from '..'

describe('CheckboxFormItem.vue', () => {
  describe('single checkbox', () => {
    const DEFAULT_ITEM: CheckboxFormItem = {
      type: 'checkbox',
      name: 'launched',
      label: 'Launched',
    }

    it('should be show label', async () => {
      const item = ref<CheckboxFormItem>({ ...DEFAULT_ITEM })

      const wrapper = mount(() => <EncCheckboxFormItem item={item.value} />)

      await nextTick()
      expect(wrapper.find('.el-checkbox__label').text()).toBe('') // default checkbox right side label is empty

      item.value.checkboxSingleLabel = '是否启动'
      await nextTick()
      expect(wrapper.find('.el-checkbox__label').text()).toBe('是否启动')
    })

    it('should able be to sync value with single checkbox', async () => {
      const modelValue = ref()
      const item = ref<CheckboxFormItem>({ ...DEFAULT_ITEM })

      const wrapper = mount(() => (
        <EncCheckboxFormItem v-model={modelValue.value} item={item.value} />
      ))

      const elCheckboxRef = wrapper.findComponent(ElCheckbox)
      expect(elCheckboxRef.exists()).toBe(true)
      expect(elCheckboxRef.classes()).not.toContain('is-checked')

      modelValue.value = false
      await nextTick()
      expect(elCheckboxRef.classes()).not.toContain('is-checked')

      modelValue.value = true
      await nextTick()
      expect(elCheckboxRef.classes()).toContain('is-checked')

      await elCheckboxRef.find('input').setValue(false)
      expect(elCheckboxRef.classes()).not.toContain('is-checked')
      expect(modelValue.value).toBe(false)

      await elCheckboxRef.find('input').setValue(true)
      expect(elCheckboxRef.classes()).toContain('is-checked')
      expect(modelValue.value).toBe(true)
    })

    it('should able be to sync custom value with single checkbox', async () => {
      const modelValue = ref()
      const item = ref<CheckboxFormItem>({
        ...DEFAULT_ITEM,
        checkboxSingleTrueValue: 'on',
        checkboxSingleFalseValue: 'off',
      })

      const wrapper = mount(() => (
        <EncCheckboxFormItem v-model={modelValue.value} item={item.value} />
      ))

      const elCheckboxRef = wrapper.findComponent(ElCheckbox)
      expect(elCheckboxRef.exists()).toBe(true)
      expect(elCheckboxRef.classes()).not.toContain('is-checked')

      modelValue.value = 'off'
      await nextTick()
      expect(elCheckboxRef.classes()).not.toContain('is-checked')

      modelValue.value = 'on'
      await nextTick()
      expect(elCheckboxRef.classes()).toContain('is-checked')

      await elCheckboxRef.find('input').setValue(false)
      expect(elCheckboxRef.classes()).not.toContain('is-checked')
      expect(modelValue.value).toBe('off')

      await elCheckboxRef.find('input').setValue(true)
      expect(elCheckboxRef.classes()).toContain('is-checked')
      expect(modelValue.value).toBe('on')
    })
  })

  describe('checkbox group', () => {
    const DEFAULT_ITEM: CheckboxFormItem = {
      type: 'checkbox',
      name: 'tags',
      label: 'Tags',
      checkboxType: 'group',
      checkboxGroupOptions: [
        { label: 'Tag 1', value: 'tag1' },
        { label: 'Tag 2', value: 'tag2' },
        'Tag3',
      ],
    }

    it('should able be to sync value with checkbox group', async () => {
      const modelValue = ref()
      const item = ref<CheckboxFormItem>({ ...DEFAULT_ITEM })

      const wrapper = mount(() => (
        <EncCheckboxFormItem v-model={modelValue.value} item={item.value} />
      ))

      const elCheckboxGroupRef = wrapper.findComponent(ElCheckboxGroup)
      expect(elCheckboxGroupRef.exists()).toBe(true)

      const elCheckboxRefs = elCheckboxGroupRef.findAllComponents(ElCheckbox)
      expect(elCheckboxRefs.length).toBe(3)

      modelValue.value = ['tag1']
      await nextTick()
      expect(elCheckboxRefs[0].classes()).toContain('is-checked')

      await elCheckboxRefs[0].find('input').setValue(false)
      expect(modelValue.value).toEqual([])

      modelValue.value = ['tag1', 'Tag3']
      await nextTick()
      expect(elCheckboxRefs[0].classes()).toContain('is-checked')
      expect(elCheckboxRefs[1].classes()).not.toContain('is-checked')
      expect(elCheckboxRefs[2].classes()).toContain('is-checked')

      await elCheckboxRefs[0].find('input').setValue(false)
      expect(modelValue.value).toEqual(['Tag3'])

      // max limit
      item.value.checkboxGroupMax = 1
      await nextTick()
      await elCheckboxRefs[0].find('input').setValue(true) // should not work
      expect(modelValue.value).toEqual(['Tag3'])
    })
  })
})
