import type { App, Plugin } from 'vue'

import { CreateEncOptions, usingSFCWithInstall } from '@cphayim-enc/vue'

import './styles'
import * as componentMap from './components'

export const createEncExtensionFormEditor = ({
  skipEncInstall = false,
}: CreateEncOptions = {}): Plugin => {
  return {
    install(app: App) {
      if (!skipEncInstall) {
        usingSFCWithInstall(app, componentMap)
      }
    },
  }
}

export default createEncExtensionFormEditor()

export * from '@cphayim-enc/extension-form-editor'
export * from './hooks'
export * from './components'
