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
   * 下拉选择框类型
   * @default 'select'
   */
  selectType?: SelectFormItemType
  /**
   * 是否多选
   * @default false
   */
  selectMultiple?: boolean
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

export type SelectFormItemType = 'select' | 'cascader'

export type SelectFormItemOption = {
  /**
   * 显示用文本
   */
  label: string | number
  /**
   * 值
   */
  value?: string | number | boolean
  /**
   * 级联选择子项
   */
  children?: SelectFormItemOption[]
}
