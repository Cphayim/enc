import type { PopupFormItem } from './PopupFormItem'

/**
 * 纯时间表单项
 */
export interface TimeFormItem<F = string, E = any> extends PopupFormItem<F, E> {
  /**
   * @override
   */
  type: 'time'
}
