import { withInstall } from '@cphayim-enc/vue'

import _EncForm from './Form.vue'
import _EncInputFormItem from './items/InputFormItem.vue'
import _EncSelectFormItem from './items/SelectFormItem.vue'
import _EncCascaderFormItem from './items/CascaderFormItem.vue'
import _EncDateFormItem from './items/DateFormItem.vue'
import _EncTimeFormItem from './items/TimeFormItem.vue'

export type EncFormInstanceType = InstanceType<typeof _EncForm>

export const EncForm = withInstall(_EncForm)
export const EncInputFormItem = withInstall(_EncInputFormItem)
export const EncSelectFormItem = withInstall(_EncSelectFormItem)
export const EncCascaderFormItem = withInstall(_EncCascaderFormItem)
export const EncDateFormItem = withInstall(_EncDateFormItem)
export const EncTimeFormItem = withInstall(_EncDateFormItem)
