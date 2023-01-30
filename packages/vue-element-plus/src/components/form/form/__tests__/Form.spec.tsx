import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { useForm } from '../../../../hooks/use-form'
import { EncFormItem } from '../../form-item'
import { EncForm } from '..'
import { createConsoleSpy } from '@cphayim-enc/test-utils'

describe('Form.vue', () => {
  it('should render correct contents and sync data', async () => {
    const { formData, formItems } = useForm({} as any, [
      {
        type: 'input',
        name: 'nickname',
        label: '昵称',
      },
      {
        type: 'select',
        name: 'colors',
        label: '颜色',
        selectOptions: [
          { label: '红色', value: 'red' },
          { label: '绿色', value: 'green' },
          { label: '蓝色', value: 'blue' },
        ],
      },
    ])

    const wrapper = mount(() => <EncForm v-model:data={formData.value} items={formItems.value} />)

    expect(formData.value).toEqual({})
    const encFormItemRefs = wrapper.findAllComponents(EncFormItem)
    expect(encFormItemRefs.length).toBe(2)

    await encFormItemRefs[0].vm.$emit('update:modelValue', 'test')
    expect(formData.value.nickname).toBe('test')

    await encFormItemRefs[1].vm.$emit('update:modelValue', 'green')
    expect(formData.value.colors).toBe('green')
  })

  it('should be able to validate form', async () => {
    createConsoleSpy()

    const { formData, formItems } = useForm(
      {} as any,
      [
        {
          type: 'input',
          name: 'nickname',
          label: '昵称',
        },
        {
          type: 'select',
          name: 'colors',
          label: '颜色',
          selectOptions: [
            { label: '红色', value: 'red' },
            { label: '绿色', value: 'green' },
            { label: '蓝色', value: 'blue' },
          ],
        },
      ],
      { defaultProps: { rules: [{ required: true, message: '必填项' }] } },
    )

    const wrapper = mount(() => <EncForm v-model:data={formData.value} items={formItems.value} />)
    try {
      await wrapper.findComponent(EncForm).vm.validate()
    } catch (error) {
      expect(error.nickname).toBeDefined()
      expect(error.colors).toBeDefined()
    }

    const encFormItemRefs = wrapper.findAllComponents(EncFormItem)

    await encFormItemRefs[0].vm.$emit('update:modelValue', 'test')
    expect(formData.value.nickname).toBe('test')
    try {
      await wrapper.findComponent(EncForm).vm.validate()
    } catch (error) {
      expect(error.nickname).not.toBeDefined()
      expect(error.colors).toBeDefined()
    }

    await encFormItemRefs[1].vm.$emit('update:modelValue', 'green')
    expect(formData.value.colors).toBe('green')
    await expect(wrapper.findComponent(EncForm).vm.validate()).resolves.toBeUndefined()
  })
})
