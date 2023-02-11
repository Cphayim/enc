import { withInstall } from '@cphayim-enc/vue'

import type { VisualFormEditorConfig } from '../props'
import VisualFormEditor from './VisualFormEditor.vue'

export const EncVisualFormEditor = withInstall(VisualFormEditor)

export const DEFAULT_VISUAL_FORM_EDITOR_CONFIG: VisualFormEditorConfig = {
  mode: 'visual',
}
