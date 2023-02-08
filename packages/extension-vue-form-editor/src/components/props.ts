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
}

export interface VisualFormEditorConfig extends BaseFormEditorConfig {
  mode: 'visual'
}

export interface CodeFormEditorConfig extends BaseFormEditorConfig {
  mode: 'code'
}
