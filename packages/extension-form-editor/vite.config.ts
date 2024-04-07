import { type UserConfigExport, defineConfig } from 'vite'

import { createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({ mode, root: __dirname }),
    plugins: [],
  }

  return config
})
