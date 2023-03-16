import { withInstall } from '@cphayim-enc/vue'

import Icon from './Icon.vue'

export const EncFormEditorIcon = withInstall(Icon)

export enum FormEditorIcon {
  Remove = 'remove',
  Add = 'add',
  Close = 'close',
}
