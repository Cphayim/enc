import type { PopupFormItem } from './PopupFormItem'

/**
 * 日期时间表单项
 */
export interface DatetimeFormItem<F = string, E = any> extends PopupFormItem<F, E> {
  /**
   * @override
   */
  type: 'datetime'

  /**
   * 日期时间类型
   * @default 'datetime'
   */
  datetimeType?: DatetimeFormItemType
  /**
   * 日期格式化
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  datetimeFormat?: string
  /**
   * 日期时间展示格式化
   * 默认跟随 datetimeFormat
   */
  datetimeDisplayFormat?: string
  /**
   * 可选最小日期
   */
  datetimeMinDate?: Date
  /**
   * 可选最大日期
   */
  datetimeMaxDate?: Date
}

export type DatetimeFormItemType = 'datetime' | 'date' | 'year-month' | 'month-day' | 'time'
