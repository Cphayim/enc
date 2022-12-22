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
   * 默认跟随 `datetimeFormat`
   */
  datetimeDisplayFormat?: string
  /**
   * 可选最小日期
   */
  datetimeMinDate?: Date | string
  /**
   * 可选最大日期
   */
  datetimeMaxDate?: Date | string
  /**
   * 日期范围分隔符
   *
   * 仅 `datetimeType` 为 `"daterange"` 时有效
   * @default '-'
   */
  datetimeRangeSeparator?: string
  /**
   * 日期范围开始占位符
   *
   * 仅 `datetimeType` 为 `"daterange"` 时有效
   */
  datetimeRangeStartPlaceholder?: string
  /**
   * 日期范围结束占位符
   *
   * 仅 `datetimeType` 为 `"daterange"` 时有效
   */
  datetimeRangeEndPlaceholder?: string

  // /**
  //  * 周起始日
  //  * - 0: 周日
  //  * - 1: 周一
  //  * @default 0
  //  */
  // datetimeWeekFirstDay?: 0 | 1
}

export type DatetimeFormItemType = 'datetime' | 'date' | 'year-month' | 'month-day' | 'daterange'
