import type { FormEditorPreset } from './FormEditorPreset'
import type { FormEditorBizFeature } from './FormEditorBiz'

export enum FormEditorOperation {
  /**
   * 提交
   */
  Submit,
  /**
   * 预览
   */
  Preview,
  /**
   * 打印配置项到控制台
   */
  PrintItems,
}

/**
 * 可视化表单编辑器配置
 */
export interface FormEditorConfig {
  /**
   * 预览用的 EncForm 组件（注意不是组件实例）
   *
   * 你可以传入任何一个 @cphayim-enc/vue 下的 ui-package 所提供的 EncForm 组件
   */
  encFormComponent?: any
  /**
   * 需要透传给预览用的 EncForm 组件的额外 props
   */
  encFormProps?: Record<string, any>
  /**
   * 启用的操作项
   */
  operations?: FormEditorOperation[]
  /**
   * 启用的预设功能，没有传递则全开
   */
  presets?: FormEditorPreset[]
  /**
   * 启用的业务功能
   */
  bizFeatures?: FormEditorBizFeature[]
  /**
   * 仅使用随机字段名
   *
   * 启用后控件 name 不可编辑
   */
  randomNameOnly?: boolean
  /**
   * 随机字段名长度
   *
   * @default 8
   */
  randomNameLength?: number
  /**
   * formItem 为空时的提示文字
   */
  formItemEmptyText?: string
}
