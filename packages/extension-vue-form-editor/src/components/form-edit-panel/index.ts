import { type Emitter, type FormItemUnion, withInstall } from '@cphayim-enc/vue'
import type {
  PresetFormEditorFeature,
  BizFormEditorFeature,
} from '@cphayim-enc/extension-form-editor'

import FormEditPanel from './FormEditPanel.vue'

export const EncFormEditPanel = withInstall(FormEditPanel)

export type FormEditorSelectedItem = {
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

export type FormEditorInternalEvents = {
  'add-item': { item: FormItemUnion; index: number; select?: boolean }
  'remove-item': { index: number; select?: boolean }
  'move-item': { oldIndex: number; newIndex: number }
  'add-item-by-feature': {
    feature: PresetFormEditorFeature | BizFormEditorFeature
    index?: number // 添加的位置，默认为尾部
    oldIndex?: number // 先前的位置，需要移除
  }
  // 'select': 选中状态
  // 'add': 添加的选中状态（显示添加效果），后续取消选中
  // 'remove': 移除的选中状态（显示移除效果），后续取消选中
  // 'unselect': 取消选中状态
  'select-item': FormEditorSelectedItem | { type: 'unselect' }
}

export type FormEditorInternalEmitter = Emitter<FormEditorInternalEvents>
