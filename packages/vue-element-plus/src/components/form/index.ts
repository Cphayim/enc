import { withInstall } from '@cphayim-enc/vue'

import _EncForm from './Form.vue'
import _EncDatetimeFormItem from './items/DatetimeFormItem.vue'
import _EncInputFormItem from './items/InputFormItem.vue'
import _EncSelectFormItem from './items/SelectFormItem.vue'
import _EncTimeFormItem from './items/TimeFormItem.vue'

export type EncFormInstanceType = InstanceType<typeof _EncForm>

export const EncForm = withInstall(_EncForm)
export const EncInputFormItem = withInstall(_EncInputFormItem)
export const EncSelectFormItem = withInstall(_EncSelectFormItem)
export const EncDatetimeFormItem = withInstall(_EncDatetimeFormItem)
export const EncTimeFormItem = withInstall(_EncTimeFormItem)
