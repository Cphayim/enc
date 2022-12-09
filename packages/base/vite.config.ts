import { UserConfigExport, defineConfig } from 'vite'

import { createBuild, createDTSPlugin } from '../vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({ mode, root: __dirname }),
    plugins: [],
  }

  // generate dts file
  if (mode === 'production') {
    config.plugins!.push(createDTSPlugin({ mode, root: __dirname }))
  }

  return config
})
