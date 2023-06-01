import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

import type { FormItemUnion, SelectFormItemOption } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useSyncOptionsEditorItems } from '../use-sync-editor-options-items'
import { createTestMockEncForm } from '../../__tests__/mock-enc-form'

function createOptionItems(): FormItemUnion[] {
  return [
    { name: 'label', label: '文本', type: 'input', col: 8 },
    { name: 'value', label: '值', type: 'input', col: 8 },
    { name: 'disabled', label: '禁用', type: 'checkbox', col: 8 },
  ]
}

describe('useSyncOptionsEditorItems', () => {
  it('should not be sync options when syncOptionsLabelAndValue -> false', async () => {
    const modelValue = ref<SelectFormItemOption>({ label: '', value: '', disabled: false })
    const config = ref<FormEditorConfig>({
      encFormComponent: createTestMockEncForm(),
      // syncOptionsLabelAndValue: false, // default
    })
    const { getItem } = useSyncOptionsEditorItems(createOptionItems(), config.value, modelValue)

    modelValue.value.label = '选项一'
    await nextTick()
    expect(modelValue.value.value).toBe('')

    expect(getItem('label')?.col).toBe(8)
    expect(getItem('value')?.disabled).toBeFalsy()
    expect(getItem('value')?.hidden).toBeFalsy()
  })

  it('should be sync options when syncOptionsLabelAndValue -> true', async () => {
    const modelValue = ref<SelectFormItemOption>({ label: '', value: '', disabled: false })
    const config = ref<FormEditorConfig>({
      encFormComponent: createTestMockEncForm(),
      syncOptionsLabelAndValue: true,
    })
    const { getItem } = useSyncOptionsEditorItems(createOptionItems(), config.value, modelValue)

    modelValue.value.label = '选项一'
    await nextTick()
    expect(modelValue.value.value).toBe('选项一')

    expect(getItem('label')?.col).toBe(16)
    expect(getItem('value')?.disabled).toBeTruthy()
    expect(getItem('value')?.hidden).toBeTruthy()
  })
})
