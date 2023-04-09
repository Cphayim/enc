import { resolve } from 'node:path'
import fs from 'node:fs'

import type { BuildOptions, UserConfig } from 'vite'
import { PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

export const EXTERNAL_REPO_PKG = /^@cphayim-enc\/(.*)/

export type CreateOptions = {
  mode: string
  root: string
  external?: (string | RegExp)[]
}

export const createBuild = ({ root, external }: CreateOptions) => {
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
      external: [EXTERNAL_REPO_PKG, ...(external ?? [])],
      output: {
        exports: 'named',
        // assetFileNames: (assetInfo) => {
        //   return assetInfo.name === 'style.css' ? 'index.css' : assetInfo.name!
        // },
      },
    },
  }
  return build
}

export type CreateDTSPluginOptions = CreateOptions & {
  skipDiagnostics?: boolean
  rollupTypes?: boolean
}

export const createDTSPlugin = ({
  mode,
  root,
  skipDiagnostics,
  rollupTypes = true,
}: CreateDTSPluginOptions) => {
  return dts({
    skipDiagnostics,
    // entryRoot: resolve(__dirname, 'src'),
    tsConfigFilePath: resolve(root, 'tsconfig.build.json'),
    rollupTypes,
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

export type genStylePluginOptions = {
  /**
   * @default []
   */
  preImports?: string[]
  /**
   * @default './style.css'
   */
  style?: string
}

export function genStylePlugin({
  preImports = [],
  style = './style.css',
}: genStylePluginOptions = {}): PluginOption {
  let hasRun = false
  return {
    name: 'genStyle',
    apply: 'build',
    writeBundle(options, bundle) {
      if (hasRun) return
      hasRun = true

      const imports = [...preImports, style]
      const dTS = resolve(options.dir!, 'style.d.ts')
      const js = resolve(options.dir!, 'style.js')
      const cjs = resolve(options.dir!, 'style.cjs')

      fs.writeFileSync(dTS, imports.map((path) => `import '${path}'`).join('\n'))
      fs.writeFileSync(js, imports.map((path) => `import '${path}'`).join('\n'))
      fs.writeFileSync(cjs, imports.map((path) => `require('${path}')`).join('\n'))
    },
  }
}
