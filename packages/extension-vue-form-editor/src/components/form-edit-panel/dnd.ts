import type {
  BizFormEditorFeature,
  PresetFormEditorFeature,
} from '@cphayim-enc/extension-form-editor'

// 枚举无法使用 Symbol
export const DnDTypes = {
  Feature: Symbol('feature'), // 左侧控件栏
  Item: Symbol('item'), // 表单项
}

export interface DragItem {
  type: 'item'
  index: number // 被拖动项的索引
}
export interface DragFeature {
  type: 'feature'
  feature: PresetFormEditorFeature | BizFormEditorFeature // 被拖动的控件功能（新增）
  currentIndex?: number // 当前保存位置的索引
}
