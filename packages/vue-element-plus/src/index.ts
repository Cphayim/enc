import type { App, Plugin } from 'vue'

import { CreateEncOptions, usingSFCWithInstall } from '@cphayim-enc/vue'

import './style.css'
import * as componentMap from './components'
import * as thirdPartyComponentMap from './components/third-party'

export const createEncElementPlus = ({
  skipDepsInstall = false,
  skipEncInstall = false,
}: CreateEncOptions = {}): Plugin => {
  return {
    install(app: App) {
      // 先安装依赖的第三方组件
      if (!skipDepsInstall) {
        usingSFCWithInstall(app, thirdPartyComponentMap)
      }
      // 这个包中的组件
      if (!skipEncInstall) {
        usingSFCWithInstall(app, componentMap)
      }
    },
  }
}

export default createEncElementPlus()

export * from './upstream'
export * from './hooks'
export * from './components'
