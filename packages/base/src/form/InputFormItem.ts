import type { BaseFormItem } from './BaseFormItem'

/**
 * 输入表单项类型
 */
export interface InputFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'input'
  /**
   * 输入框类型
   */
  inputType?: InputFormItemType
  /**
   * 最大长度
   */
  inputMaxLength?: number
  /**
   * 输入框行数，仅 textarea 有效
   */
  inputRows?: number
}

export type InputFormItemType = 'text' | 'password' | 'number' | 'textarea'
