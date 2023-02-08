import { withInstall } from '@cphayim-enc/vue'
import FormEditor from './FormEditor.vue'

export const EncFormEditor = withInstall(FormEditor)
export type EncFormEditorInstanceType = InstanceType<typeof EncFormEditor>
