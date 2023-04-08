import vue from '@vitejs/plugin-vue'
import { UserConfigExport, defineConfig } from 'vite'

import { createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    build: createBuild({ mode, root: __dirname, external: ['vue', '@vueuse/core'] }),
    plugins: [vue()],
  }

  // after the build, use vue-tsc to generate the type declaration file

  return config
})
