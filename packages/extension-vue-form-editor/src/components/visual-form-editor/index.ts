import { Emitter, FormItemUnion, withInstall } from '@cphayim-enc/vue'
import {
  type VisualFormEditorConfig,
  FormEditorPreset,
  FormEditorPresetFeature,
  FormEditorBizFeature,
} from '@cphayim-enc/extension-form-editor'

import VisualFormEditor from './VisualFormEditor.vue'

export const EncVisualFormEditor = withInstall(VisualFormEditor)

export const DEFAULT_VISUAL_FORM_EDITOR_CONFIG: VisualFormEditorConfig = {
  mode: 'visual',
  // default enable all
  presets: Object.values(FormEditorPreset),
  randomNameOnly: false,
  randomNameLength: 8,
}

export type VisualFormEditorSelectedItem = {
  type: string
  index: number
  item: FormItemUnion
} & (
  | { type: 'select' }
  | {
      type: 'adding' | 'removing'
      callback?: () => void // 取消选中后的回调
    }
)

export type VisualFormEditorInternalEvents = {
  'add-item': { item: FormItemUnion; index: number; select?: boolean }
  'remove-item': { index: number; select?: boolean }
  'move-item': { oldIndex: number; newIndex: number }
  'add-item-by-feature': {
    feature: FormEditorPresetFeature | FormEditorBizFeature
    index?: number // 添加的位置，默认为尾部
    oldIndex?: number // 先前的位置，需要移除
  }
  // 'select': 选中状态
  // 'add': 添加的选中状态（显示添加效果），后续取消选中
  // 'remove': 移除的选中状态（显示移除效果），后续取消选中
  // 'unselect': 取消选中状态
  'select-item': VisualFormEditorSelectedItem | { type: 'unselect' }
}
export type VisualFormEditorInternalEmitter = Emitter<VisualFormEditorInternalEvents>
