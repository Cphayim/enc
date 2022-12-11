import vue from '@vitejs/plugin-vue'
import { UserConfigExport, defineConfig } from 'vite'

import { EXTERNAL_REPO_PKG, addDTSPlugin, createBuild } from '../vite.base.config'

export default defineConfig(({ mode }) => {
  const build = createBuild({ mode, root: __dirname })
  build.rollupOptions = {
    external: [EXTERNAL_REPO_PKG, 'vue', '@vueuse/core'],
    output: {
      assetFileNames: (assetInfo) => {
        return assetInfo.name === 'style.css' ? 'index.css' : assetInfo.name!
      },
    },
  }

  const config: UserConfigExport = {
    build,
    plugins: [vue()],
  }

  // generate dts file, skip diagnostics, use `vue-tsc` check types
  addDTSPlugin(config, { mode, root: __dirname, skipDiagnostics: true })

  return config
})
