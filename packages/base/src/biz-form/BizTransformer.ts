import type { BizFormItemUnion, BizPlaceHolderExtra, BizRealExtra } from './BizFormItemUnion'

/**
 * "占位项" <=> "实际项" | "实际项"[] 的转换器
 *
 * 由业务侧定义，如果没有传递，业务侧需要在出入口处自行转换配置项
 */
export type BizTransform = {
  /**
   * "占位项" => "实际项" | "实际项"[]
   *
   * 表单编辑器输出 items 时调用
   */
  toReal: (
    item: BizFormItemUnion<BizPlaceHolderExtra>,
    randomStr: string,
  ) => BizFormItemUnion<BizRealExtra> | BizFormItemUnion<BizRealExtra>[]

  /**
   * "实际项" | "实际项"[] => "占位项"
   *
   * items 输入表单编辑器时调用
   */
  toPlaceHolder: (
    itemOrItems: BizFormItemUnion<BizRealExtra> | BizFormItemUnion<BizRealExtra>[],
    randomStr: string,
  ) => BizFormItemUnion<BizPlaceHolderExtra>
}
