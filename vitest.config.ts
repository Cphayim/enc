import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import defineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [vue(), vueJsx(), defineOptions()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    restoreMocks: true,
    environment: 'jsdom',
    server: {
      deps: { inline: ['element-plus', 'vant', 'vue3-dnd'] },
    },
    // setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      include: ['packages/*/src/**/*.{ts,vue}'],
      reporter: ['text', 'lcov'],
      statements: 80,
    },
  },
})
