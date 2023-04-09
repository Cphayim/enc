import { UserConfigExport, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import defineOptions from 'unplugin-vue-define-options/vite'

import { createBuild, genStylePlugin } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({
      mode,
      root: __dirname,
      external: ['vue', 'vue-router', '@vueuse/core', 'vant', /^vant\/es/],
    }),
    plugins: [
      vue(),
      vueJsx(),
      defineOptions(),
      genStylePlugin({ preImports: ['vant/es/toast/style/index', '@cphayim-enc/vue/style'] }),
    ],
  }

  // after the build, use vue-tsc to generate the type declaration file

  return config
})
