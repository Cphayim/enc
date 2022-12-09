export * from './types'

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
