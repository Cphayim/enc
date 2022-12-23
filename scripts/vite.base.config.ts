import { resolve } from 'node:path'

import type { BuildOptions, UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

export const EXTERNAL_REPO_PKG = /^@cphayim-enc\/(.*)/

export type CreateOptions = {
  mode: string
  root: string
}

export const createBuild = ({ root }: CreateOptions) => {
  const build: BuildOptions = {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index${format === 'es' ? '.js' : '.cjs'}`,
    },
    rollupOptions: {
      external: [EXTERNAL_REPO_PKG],
    },
  }
  return build
}

export type CreateDTSPluginOptions = CreateOptions & {
  skipDiagnostics?: boolean
}

export const createDTSPlugin = ({ mode, root, skipDiagnostics }: CreateDTSPluginOptions) => {
  return dts({
    skipDiagnostics,
    // entryRoot: resolve(__dirname, 'src'),
    tsConfigFilePath: resolve(root, 'tsconfig-build.json'),
    rollupTypes: true,
    copyDtsFiles: false,
    staticImport: true,
    beforeWriteFile: (filePath, content) => {
      return { filePath, content }
    },
  })
}

export const addDTSPlugin = (config: UserConfig, options: CreateDTSPluginOptions) => {
  if (options.mode === 'production') {
    config.plugins = [...(config.plugins ?? []), createDTSPlugin(options)]
  }
}
