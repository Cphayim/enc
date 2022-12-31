import vue from '@vitejs/plugin-vue'
import defineOptions from 'unplugin-vue-define-options/vite'
import { UserConfigExport, defineConfig } from 'vite'

import { EXTERNAL_REPO_PKG, addDTSPlugin, createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const build = createBuild({ mode, root: __dirname })
  build.rollupOptions = {
    external: [
      EXTERNAL_REPO_PKG,
      'vue',
      '@vueuse/core',
      'vant',
      /^vant\/es/, //
    ],
    output: {
      exports: 'named',
      assetFileNames: (assetInfo) => {
        return assetInfo.name === 'style.css' ? 'index.css' : assetInfo.name!
      },
    },
  }

  const config: UserConfigExport = {
    build,
    plugins: [vue(), defineOptions()],
  }

  // after the build, use vue-tsc to generate the type declaration file

  return config
})
