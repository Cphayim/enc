import type { BaseFormItem } from '../base'

/**
 * 单选框表单项类型
 */
export interface RadioFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'radio'
  /**
   * 单选框组选项
   */
  radioOptions?: (RadioLabelOrValue | RadioOptions)[]
}

export type RadioLabelOrValue = string | number | boolean
export type RadioOptions = {
  /**
   * radio 标签右侧文字
   */
  label: RadioLabelOrValue
  /**
   * radio 选中时的值，不存在时取 `label` 的值
   */
  value?: RadioLabelOrValue
  /**
   * 是否禁用该项
   */
  disabled?: boolean
}
