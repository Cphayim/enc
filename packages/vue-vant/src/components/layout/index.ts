import { withInstall } from '@cphayim-enc/vue'
import Layout from './Layout.vue'

export type EncLayoutInstanceType = InstanceType<typeof Layout>
export const EncLayout = withInstall(Layout)
