import type { BaseFormItem } from './base'

/**
 * 自定义表单项
 */
export interface CustomFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'custom'
}
