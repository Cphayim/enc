import type { FormItemUnion } from '../form'

export type BizBaseExtra = {
  /**
   * 标记为业务表单控件
   */
  biz: true
  /**
   * 业务表单控件名
   *
   * 业务表单控件可能是组合式控件，即由多个常规控件组合，此时应为组名
   */
  bizName: string
}

/**
 * BizFormItemUnion 占位配置项（表单编辑器内占位用）的额外字段
 */
export type BizPlaceHolderExtra = BizBaseExtra & {
  /**
   * 显示在表单编辑器上的 label 名称
   */
  bizLabel: string
}

/**
 * BizFormItemUnion 实际配置项（实际使用或表单编辑器的产出物）的额外字段
 */
export type BizRealExtra = BizBaseExtra & {
  /**
   * 业务表单控件字段名
   *
   * - 当业务表单控件仅包含一个常规控件时，可以与 `bizName` 相同
   * - 当业务表单控件包含多个常规控件时，应为表示常规控件在组中的名称
   */
  bizField: string
  /**
   * 业务表单控件随机值
   *
   * 例如一个 `bizName: 'offer'` 的报价业务控件，输出物品、数量、单价 3 个输入框
   * 当一份表单中出现两个报价业务控件时，该值用于标记输出的 6 个控件中哪 3 个是一组的
   */
  bizKey: string
}

/**
 * BizFormItem 可以是任意 type 的 FormItem，分为 "占位项" 和 "实际项" 两类
 */
export type BizFormItemUnion<E = BizPlaceHolderExtra | BizRealExtra> = FormItemUnion<string, E>
