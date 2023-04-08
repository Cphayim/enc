import { UserConfigExport, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import defineOptions from 'unplugin-vue-define-options/vite'

import { createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({
      mode,
      root: __dirname,
      external: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'element-plus',
        '@element-plus/icons-vue',
        /^element-plus\/es/,
      ],
    }),
    plugins: [vue(), vueJsx(), defineOptions()],
  }

  // after the build, use vue-tsc to generate the type declaration file

  return config
})
