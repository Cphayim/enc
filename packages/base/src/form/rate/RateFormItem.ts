import type { BaseFormItem } from '../base'

/**
 * 评分表单项类型
 */
export interface RateFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'rate'
  /**
   * 评分最大值
   * @default 5
   */
  rateMax?: number
  /**
   * 是否允许半选
   * @default false
   */
  rateAllowHalf: false
  /**
   * 选中时颜色
   * @default '#F7BA2A'
   */
  rateColor?: string
  /**
   * 未选中时颜色
   * @default #C6D1DE
   */
  rateVoidColor?: string
  /**
   * 星星数量对应的文本
   *
   * 注意: `texts.length` 需要等于 `rateMax`
   */
  rateTexts?: string[]
}
