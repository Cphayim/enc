import type { FormItemUnion } from '../form'
import type { BizPlaceHolderExtra, BizTransform } from '../biz-form'

/**
 * 表单编辑器可用的预设功能
 */
export type FormEditorPresetFeature = FormItemUnion['type']

/**
 * 表单编辑器可用的业务功能
 */
export type FormEditorBizFeature = Pick<BizPlaceHolderExtra, 'bizName' | 'bizPlaceHolderLabel'> & {
  /**
   * "占位项" <=> "实际项" | "实际项"[] 的转换器
   */
  bizTransform: BizTransform
}
