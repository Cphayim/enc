import type { PopupFormItem } from './PopupFormItem'

/**
 * 选择表单项类型
 */
export interface SelectFormItem<F = string, E = any> extends PopupFormItem<F, E> {
  /**
   * @override
   */
  type: 'select'
  /**
   * 是否多选
   * @default false
   */
  selectMultiple?: boolean
  /**
   * 多选时最多可选个数，0 为不限制
   * @default 0
   */
  selectMultipleLimit?: number
  /**
   * 是否支持搜索过滤
   *
   * 由 UI package 决定是否支持，如果不支持，将会忽略该配置
   */
  selectFilterable?: boolean
  /**
   * 选择项
   * @default []
   */
  selectOptions?: SelectFormItemOption[]
}

export type SelectFormItemOption = {
  /**
   * 显示用文本
   */
  label: string
  /**
   * 值
   */
  value: string | number | boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
}
