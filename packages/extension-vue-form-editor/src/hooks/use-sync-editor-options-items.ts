import { Ref, watchEffect, WritableComputedRef } from 'vue'

import type {
  CascaderFormItemOption,
  CheckboxOptions,
  FormItemUnion,
  RadioOptions,
  SelectFormItemOption,
} from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from './use-editor-items'

type OptionUnion =
  | undefined
  | SelectFormItemOption
  | CascaderFormItemOption
  | RadioOptions
  | CheckboxOptions

/**
 * Options 表单编辑器表单项
 *
 * 仅用于 Select, Radio, Checkbox 的 Options 配置项的 items
 */
export function useSyncOptionsEditorItems<T extends OptionUnion>(
  items: FormItemUnion[],
  config: FormEditorConfig,
  modelValue: Ref<T> | WritableComputedRef<T>,
) {
  const rest = useEditorItems(items, config)

  const { updateItem } = rest

  // 开启键值同步时更新 items，并同步值
  watchEffect(() => {
    updateItem('label', {
      col: config.syncOptionsLabelAndValue ? 16 : 8,
    })
    updateItem('value', {
      disabled: config.syncOptionsLabelAndValue,
      hidden: config.syncOptionsLabelAndValue,
    })
  })
  watchEffect(() => {
    if (modelValue.value && config.syncOptionsLabelAndValue) {
      modelValue.value.value = modelValue.value.label
    }
  })

  return { ...rest }
}
