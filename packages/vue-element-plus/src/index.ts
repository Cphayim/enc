import type { App, Plugin } from 'vue'

import { type CreateEncOptions, usingSFCWithInstall } from '@cphayim-enc/vue'

import './style.css'
import * as componentMap from './components'

export const createEncElementPlus = ({ skipEncInstall = false }: CreateEncOptions = {}): Plugin => {
  return {
    install(app: App) {
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
