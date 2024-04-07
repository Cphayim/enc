import { type UserConfigExport, defineConfig } from 'vite'

import { createBuild } from '../../scripts/vite.base.config'

import { version } from './package.json'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    define: {
      __ENC_VERSION__: JSON.stringify(version),
    },
    build: createBuild({ mode, root: __dirname }),
    plugins: [],
  }

  return config
})
