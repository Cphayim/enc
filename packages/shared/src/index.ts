export * from './types'

export const PKG_NAME = 'enc'

export const log = {
  debug: console.debug.bind(console, PKG_NAME),
  info: console.info.bind(console, PKG_NAME),
  warn: console.warn.bind(console, PKG_NAME),
  error: console.error.bind(console, PKG_NAME),
}

export function createErrorMessage(message: string) {
  return `[${PKG_NAME}] ${message}`
}

export function createThrowErrorFunction(message: string) {
  return () => {
    throw new Error(createErrorMessage(message))
  }
}

export function isNone(value: unknown): value is undefined | null {
  return value === undefined || value === null
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
  return JSON.parse(JSON.stringify(obj))
}

export function getFileNameFromUrl(url: string) {
  return url.split('#')[0].split('?')[0].split('/').pop() || randomStr(6)
}

export function readFileContent(file: File, resultType: 'text' | 'dataUrl') {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve((event.target as FileReader).result as string)
    }

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else if (resultType === 'text') {
      reader.readAsText(file)
    }
  })
}
