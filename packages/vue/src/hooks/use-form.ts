import type { Ref } from 'vue'

import type { FormItemUnion, PartialFormItemUnionWithoutNameAndType } from '@cphayim-enc/base'
import { useFormData } from './use-form-data'
import { useFormItems } from './use-form-items'

export type UseFormOptions = {
  /**
   * 默认表单配置项，将和 items 的每一项合并
   */
  commonItem?: PartialFormItemUnionWithoutNameAndType
  /**
   * 兼容字段，同 commonItem
   * @deprecated
   */
  defaultProps?: PartialFormItemUnionWithoutNameAndType
}

/**
 * 对等表单通用 useForm hooks
 *
 * UI package 可以进行扩展
 */
export function useForm<T extends Record<string, any>, F = Extract<keyof T, string>>(
  initData: T,
  items: FormItemUnion<F>[] | Ref<FormItemUnion<F>[]>,
  options: UseFormOptions = {},
) {
  return {
    ...useFormData<T>(initData),
    ...useFormItems<F>(items, options.commonItem ?? options.defaultProps),
  }
}
