import type { PopupFormItem } from '../popup'

/**
 * 纯时间表单项
 */
export interface TimeFormItem<F = string, E = any> extends PopupFormItem<F, E> {
  /**
   * @override
   */
  type: 'time'

  /**
   * 时间类型
   * @default 'hour-minute'
   */
  timeType?: TimeFormItemType
}

export type TimeFormItemType = 'hour-minute' | 'hour-minute-second'
