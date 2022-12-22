import { withInstall } from '@cphayim-enc/vue'

import _EncForm from './Form.vue'
import _EncInputFormItem from './items/InputFormItem.vue'
import _EncSelectFormItem from './items/SelectFormItem.vue'

export type EncFormInstanceType = InstanceType<typeof _EncForm>

export const EncForm = withInstall(_EncForm)
export const EncInputFormItem = withInstall(_EncInputFormItem)
export const EncSelectFormItem = withInstall(_EncSelectFormItem)
