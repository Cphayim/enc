import { log } from '@cphayim-enc/shared'
import type { BaseFormItem } from './BaseFormItem'

/**
 * 多选框表单项类型
 */
export interface CheckboxFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'checkbox'
  /**
   * 多选框类型
   * - 当值为 `single` 时，表示单个多选框
   *   - 使用 `checkboxSingleLabel` 来设置多选框标签
   *   - 使用 `checkboxSingleTrueValue` 和 `checkboxSingleFalseValue` 来设置选中和未选中时的值
   * - 当值为 `group` 时，表示多选框组，绑定的值为数组
   *   - 使用 `checkboxGroupLabels` 来设置多选框标签以及选中的值
   * @default 'single'
   */
  checkboxType?: CheckboxType
  /**
   * 可选，多选框标签（右侧显示的文字）
   * - 当 `checkboxType` 为 `single` 时有效
   * @default ''
   */
  checkboxSingleLabel?: CheckboxLabel
  /**
   * 多选框选中时的值
   * - 当 `checkboxType` 为 `single` 时有效
   * @default true
   */
  checkboxSingleTrueValue?: Exclude<CheckboxLabel, boolean>
  /**
   * 多选框未选中时的值
   * - 当 `checkboxType` 为 `single` 时有效
   * @default false
   */
  checkboxSingleFalseValue?: Exclude<CheckboxLabel, boolean>
  /**
   * 多选框组标签以及选中的值
   * - 当 `checkboxType` 为 `group` 时有效
   */
  checkboxGroupLabels?: (CheckboxLabel | CheckboxLabelWithOptions)[]
  /**
   * 多选框组最大可选数量，0 为不限制
   * @default 0
   */
  checkboxGroupMax?: number
}

export type CheckboxType = 'single' | 'group'
export type CheckboxLabel = string | number | boolean
export type CheckboxLabelWithOptions = {
  label: CheckboxLabel
  disabled?: boolean
}

// 校验多选框表单项
export function verifyCheckboxFormItem(item: CheckboxFormItem) {
  if (item.checkboxType === 'group') {
    if (!item.checkboxGroupLabels || !item.checkboxGroupLabels.length) {
      log.warn(
        `CheckboxFormItem.checkboxType -> 'group', but CheckboxFormItem.checkboxGroupLabels is empty`,
      )
    }
  }
}
