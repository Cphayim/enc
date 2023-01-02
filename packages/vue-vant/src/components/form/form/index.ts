import { withInstall } from '@cphayim-enc/vue'
import Form from './Form.vue'

export const EncForm = withInstall(Form)
export type EncFormInstanceType = InstanceType<typeof EncForm>
