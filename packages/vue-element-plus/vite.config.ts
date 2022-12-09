import vue from '@vitejs/plugin-vue'
import defineOptions from 'unplugin-vue-define-options/vite'
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
    build,
    plugins: [
      vue(), //
      defineOptions(), //
    ],
  }

  // generate dts file
  if (mode === 'production') {
    config.plugins!.push(
      createDTSPlugin({
        mode,
        root: __dirname,
        skipDiagnostics: true, // use `vue-tsc` check types
      }),
    )
  }

  return config
})
