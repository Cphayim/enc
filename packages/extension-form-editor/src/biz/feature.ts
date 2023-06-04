import type { ShadowBiz, BizTransformer } from '@cphayim-enc/base'
import { isNone, isString, isObject } from '@cphayim-enc/shared'

/**
 * 业务表单编辑器功能
 */
export type BizFormEditorFeature = Pick<ShadowBiz, 'bizClass' | 'bizLabel'> & {
  /**
   * 业务描述，显示在 bizLabel 下方
   */
  bizDesc?: string
  /**
   * "占位项" <=> "实际项" | "实际项"[] 的转换器
   */
  bizTransformer: BizTransformer
  /**
   * 是否单例（编辑器将阻止该业务控件被添加多次）
   * @default false
   */
  bizSingleton?: boolean
}

export function isBizFeature(feature: any): feature is BizFormEditorFeature {
  return (
    !isNone(feature) &&
    isString(feature.bizClass) &&
    isString(feature.bizLabel) &&
    isObject(feature.bizTransformer)
  )
}
