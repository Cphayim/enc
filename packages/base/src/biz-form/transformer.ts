import type { BizFormItemUnion, RealBiz, ShadowBiz } from './biz'

/**
 * `BizFormItemUnion<ShadowBiz> <-> BizFormItemUnion<RealBiz> | BizFormItemUnion<RealBiz>[]` 的转换器
 *
 * 由业务侧定义，表单编辑器组件将在出入口自动调用
 */
export type BizTransformer = {
  /**
   * `BizFormItemUnion<ShadowBiz> -> BizFormItemUnion<RealBiz> | BizFormItemUnion<RealBiz>[]`
   *
   * 表单编辑器输出 items 时调用
   *
   * @param item BizFormItemUnion<ShadowBiz>
   * @param randomStr 随机字符串
   */
  toReal: (
    item: BizFormItemUnion<ShadowBiz>,
    randomStr: string,
  ) => BizFormItemUnion<RealBiz> | BizFormItemUnion<RealBiz>[]

  /**
   * `BizFormItemUnion<RealBiz> | BizFormItemUnion<RealBiz>[] -> BizFormItemUnion<ShadowBiz>`
   *
   * 表单编辑器输入 items 时调用
   */
  toShadow: (
    itemOrItems: BizFormItemUnion<RealBiz> | BizFormItemUnion<RealBiz>[],
    randomStr: string,
  ) => BizFormItemUnion<ShadowBiz>
}
