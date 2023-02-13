import { type VisualFormEditorConfig, FormEditorPreset } from '@cphayim-enc/extension-form-editor'
import { Emitter, withInstall } from '@cphayim-enc/vue'

import VisualFormEditor from './VisualFormEditor.vue'

export const EncVisualFormEditor = withInstall(VisualFormEditor)

export const DEFAULT_VISUAL_FORM_EDITOR_CONFIG: VisualFormEditorConfig = {
  mode: 'visual',
  // default enable all
  presets: Object.values(FormEditorPreset),
}

export type VisualFormEditorInternalEvents = {
  //
}
export type VisualFormEditorInternalEmitter = Emitter<VisualFormEditorInternalEvents>
