export * from './types'
export * from './type-utils'

export const PKG_NAME = 'enc'

const LOG_PREFIX = `[${PKG_NAME}]`

export const log = {
  debug: (...arg: unknown[]) => console.debug(LOG_PREFIX, ...arg),
  info: (...arg: unknown[]) => console.info(LOG_PREFIX, ...arg),
  warn: (...arg: unknown[]) => console.warn(LOG_PREFIX, ...arg),
  error: (...arg: unknown[]) => console.error(LOG_PREFIX, ...arg),
}

export function createErrorMessage(message: string) {
  return `${LOG_PREFIX} ${message}`
}

export function createThrowErrorFunction(message: string) {
  return () => {
    throw new Error(createErrorMessage(message))
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function delayWrapper<T>(fn: () => T, delay: number) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(fn())
    }, delay)
  })
}

export function randomStr(length: number) {
  length = length || 32
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < length; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

export function deepClone<T>(obj: T): T {
  // issue: Proxy objects have problems with structuredClone
  // return typeof structuredClone !== 'undefined'
  //   ? structuredClone(obj)
  //   : JSON.parse(JSON.stringify(obj))

  return JSON.parse(JSON.stringify(obj))
}

export function getFileNameFromUrl(url: string) {
  return url.split('#')[0].split('?')[0].split('/').pop()
}
