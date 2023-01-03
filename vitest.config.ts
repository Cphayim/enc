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
    environment: 'jsdom',
    deps: {
      inline: ['element-plus', 'vant'],
    },
    // setupFiles: ['./vitest.setup.ts'],
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      include: ['packages/*/src/**/*.{ts,vue}'],
      reporter: ['text', 'lcov'],
      statements: 90,
    },
  },
})
