import vue from '@vitejs/plugin-vue'
import defineOptions from 'unplugin-vue-define-options/vite'
import { UserConfigExport, defineConfig } from 'vite'
import vueTypeImports from 'vite-plugin-vue-type-imports'

import { EXTERNAL_REPO_PKG, addDTSPlugin, createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const build = createBuild({ mode, root: __dirname })
  build.rollupOptions = {
    external: [
      EXTERNAL_REPO_PKG,
      'vue',
      '@vueuse/core',
      'element-plus',
      '@element-plus/icons-vue',
      /^element-plus\/es/,
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
    plugins: [vue(), vueTypeImports(), defineOptions()],
  }

  // generate dts file, skip diagnostics, use `vue-tsc` check types
  addDTSPlugin(config, { mode, root: __dirname, skipDiagnostics: true })

  return config
})
