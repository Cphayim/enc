import type { BaseFormItem } from './base'

/**
 * 开关表单项类型
 */
export interface SwitchFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'switch'
  /**
   * 开值
   * @default true
   */
  switchActiveValue?: boolean | number | string
  /**
   * 关值
   * @default false
   */
  switchInactiveValue?: boolean | number | string
  /**
   * 打开时的文本
   * @default ''
   */
  switchActiveText?: string
  /**
   * 关闭时的文本
   * @default ''
   */
  switchInactiveText?: string
}
