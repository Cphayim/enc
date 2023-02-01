/* eslint-disable @typescript-eslint/no-explicit-any */
import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

/**
 * 为组件添加 install 方法
 */
export const withInstall = <T>(comp: T): SFCWithInstall<T> => {
  ;(comp as any).install = (app: App): void => {
    app.component((comp as any).name, comp as any)
  }
  return comp as SFCWithInstall<T>
}

/**
 * 判断传入的组件是否是 SFCWithInstall 类型
 */
export function isSFCWithInstall<T>(component: T): component is SFCWithInstall<T> {
  return !!(component as any)?.install
}

/**
 * 批量安装组件 app.use(xxx)
 */
export function usingSFCWithInstall(
  app: App,
  components:
    | SFCWithInstall<unknown>
    | SFCWithInstall<unknown>[]
    | Record<string, SFCWithInstall<unknown>>,
) {
  if (isSFCWithInstall(components)) {
    app.use(components)
  } else if (Array.isArray(components)) {
    components.forEach((component) => isSFCWithInstall(component) && app.use(component))
  } else {
    Object.values(components).forEach(
      (component) => isSFCWithInstall(component) && app.use(component),
    )
  }
}
