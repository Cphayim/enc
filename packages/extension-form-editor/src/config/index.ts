import { PresetName } from '../preset'
import type { BizFormEditorFeature } from '../biz'

/**
 * 表单编辑器可用的操作项
 */
export enum FormEditorOperation {
  /**
   * 确认
   */
  Confirm,
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
   * 预览用的 `EncForm` 组件（注意不是组件实例）
   *
   * 你可以传入任何一个 ui-package 所提供的 `EncForm` 组件
   */
  encFormComponent?: any
  /**
   * 需要透传给预览用的 `EncForm` 组件的额外 `props`
   */
  encFormProps?: Record<string, any>
  /**
   * 启用的操作项
   */
  operations?: FormEditorOperation[]
  /**
   * 启用的预设功能，没有传递则全开
   */
  presets?: PresetName[]
  /**
   * 启用的业务功能
   */
  bizFeatures?: BizFormEditorFeature[]
  /**
   * 仅使用随机字段名
   *
   * 启用后控件 `name` 不可编辑
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
  /**
   * 是否同步 `options` 中的 `label` 和 `value`
   *
   * 这会影响到编辑器中所有含选项的配置行为
   * - `true`: 禁用选项的 `value` 编辑，自动同步 `label` 的值到 `value`
   * - `false`: 可以单独编辑 `label` 和 `value`
   *
   * @default false
   */
  syncOptionsLabelAndValue?: boolean
  /**
   * 是否为表单编辑器输出的 FormItemUnion 打标记
   * - __CREATED_BY_ENC_FORM_EDITOR__: ${ENC_VERSION}
   *
   * @default true
   */
  markItemCreatedByEditor?: boolean
}

export const DEFAULT_FORM_EDITOR_CONFIG: FormEditorConfig = {
  // default enable all
  presets: Object.values(PresetName),
  bizFeatures: [],
  randomNameOnly: false,
  randomNameLength: 8,
  syncOptionsLabelAndValue: false,
  markItemCreatedByEditor: true,
}
