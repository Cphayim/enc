import type { App, Plugin } from 'vue'

import { CreateEncOptions, usingSFCWithInstall } from '@cphayim-enc/vue'

import './style.css'
import * as componentMap from './components'

export const createEncVant = ({ skipEncInstall = false }: CreateEncOptions = {}): Plugin => {
  return {
    install(app: App) {
      if (!skipEncInstall) {
        usingSFCWithInstall(app, componentMap)
      }
    },
  }
}

export default createEncVant()

export * from './upstream'
export * from './hooks'
export * from './components'
