import type { FormEditorPresetFeature } from './FormEditorFeature'

export type FormEditorConfig = VisualFormEditorConfig | CodeFormEditorConfig

export interface BaseFormEditorConfig {
  /**
   * 表单编辑器的模式
   * @default 'visual'
   */
  mode: string
  /**
   * 是否启用“预览”功能
   */
  preview?: boolean
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
}

/**
 * 可视化表单编辑器配置
 */
export interface VisualFormEditorConfig extends BaseFormEditorConfig {
  mode: 'visual'
  /**
   * 启用的预设功能，没有传递则全开
   */
  presetFeatures?: FormEditorPresetFeature[]

  // bizFeatures?
}

/**
 * 代码表单编辑器配置
 */
export interface CodeFormEditorConfig extends BaseFormEditorConfig {
  mode: 'code'
}
