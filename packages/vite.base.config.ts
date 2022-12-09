import { resolve } from 'node:path'

import type { BuildOptions } from 'vite'
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

export const createDTSPlugin = ({ mode, root }: CreateOptions) => {
  return dts({
    // skipDiagnostics: false,
    // entryRoot: resolve(__dirname, 'src'),
    tsConfigFilePath: resolve(root, 'tsconfig.json'),
    rollupTypes: mode === 'production',
    copyDtsFiles: false,
    beforeWriteFile: (filePath, content) => {
      return { filePath, content }
    },
  })
}
