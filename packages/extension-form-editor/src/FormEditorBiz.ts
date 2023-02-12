import type { BizPlaceHolderExtra, BizTransformer } from '@cphayim-enc/base'

/**
 * 表单编辑器业务功能
 */
export type FormEditorBizFeature = Pick<BizPlaceHolderExtra, 'bizName' | 'bizLabel'> & {
  /**
   * "占位项" <=> "实际项" | "实际项"[] 的转换器
   */
  bizTransform: BizTransformer
}
