import './style.css'

export * from '@cphayim-enc/base'

export * from './install'
export * from './hooks'
export * from './components'

export type CreateEncOptions = {
  /**
   * 跳过依赖组件的安装
   */
  skipDepsInstall?: boolean
  /**
   * 跳过 enc 组件的安装
   */
  skipEncInstall?: boolean
}
