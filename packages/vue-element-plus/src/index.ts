import type { App, Plugin } from 'vue'

import { usingSFCWithInstall } from '@cphayim-enc/vue'

import * as componentMap from './components'
import * as thirdPartyComponentMap from './components/third-party'
import './style.css'

const EncElementPlus: Plugin = {
  install(app: App) {
    // 先安装依赖的第三方组件
    usingSFCWithInstall(app, thirdPartyComponentMap)
    // 这个包中的组件
    usingSFCWithInstall(app, componentMap)
  },
}

export default EncElementPlus

export * from './upstream'
export * from './hooks'
export * from './components'
