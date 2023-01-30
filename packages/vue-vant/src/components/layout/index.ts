import { withInstall } from '@cphayim-enc/vue'
import Layout from './Layout.vue'

export type TabBarOption = {
  title: string
  icon: string
  routerPath: string
  routerName?: string
}

export type EncLayoutInstanceType = InstanceType<typeof Layout>
export const EncLayout = withInstall(Layout)
