import type { ShadowBiz, BizTransformer } from '@cphayim-enc/base'

/**
 * 表单编辑器业务功能
 */
export type FormEditorBizFeature = Pick<ShadowBiz, 'bizClass' | 'bizLabel'> & {
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
