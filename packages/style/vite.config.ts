import { type UserConfigExport, defineConfig } from 'vite'

import { addDTSPlugin, createBuild, genStylePlugin } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({ mode, root: __dirname }),
    plugins: [genStylePlugin()],
  }

  // generate dts file
  addDTSPlugin(config, { mode, root: __dirname })

  return config
})
