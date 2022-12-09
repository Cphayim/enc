import vue from '@vitejs/plugin-vue'
import { UserConfigExport, defineConfig } from 'vite'

import {
  EXTERNAL_REPO_PKG,
  createBuild,
  createDTSPlugin,
} from '../vite.base.config'

export default defineConfig(({ mode }) => {
  const build = createBuild({ mode, root: __dirname })
  build.rollupOptions = {
    external: [EXTERNAL_REPO_PKG, 'vue', '@vueuse/core'],
    output: {
      assetFileNames: (assetInfo) => {
        return assetInfo.name === 'style.css'
          ? 'index.css'
          : (assetInfo.name as string)
      },
    },
  }

  const config: UserConfigExport = {
    build: build,
    plugins: [vue()],
  }

  // generate dts file
  if (mode === 'production') {
    config.plugins!.push(createDTSPlugin({ mode, root: __dirname }))
  }

  return config
})
