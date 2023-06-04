import type { PopupFormItem } from './popup'

/**
 * 日期选择器表单项
 */
export interface DateFormItem<F = string, E = any> extends PopupFormItem<F, E> {
  /**
   * @override
   */
  type: 'date'

  /**
   * 日期选择器类型
   * @default 'date'
   */
  dateType?: DateFormItemType
  /**
   * 日期格式化
   * @default 'YYYY-MM-DD'
   */
  dateFormat?: string
  /**
   * 日期展示格式化
   * 默认跟随 `dateFormat`
   */
  dateDisplayFormat?: string
  /**
   * 可选最小日期
   * @default 当前日期的10年前
   */
  dateMinDate?: Date | string
  /**
   * 可选最大日期
   * @default 当前日期的10年后
   */
  dateMaxDate?: Date | string
  /**
   * 日期范围分隔符
   *
   * 仅 `dateType` 为 `"daterange"` 时有效
   * @default '-'
   */
  dateRangeSeparator?: string
  /**
   * 日期范围开始占位符
   *
   * 仅 `dateType` 为 `"daterange"` 时有效
   */
  dateRangeStartPlaceholder?: string
  /**
   * 日期范围结束占位符
   *
   * 仅 `dateType` 为 `"daterange"` 时有效
   */
  dateRangeEndPlaceholder?: string
}

export type DateFormItemType = 'date' | 'daterange'
