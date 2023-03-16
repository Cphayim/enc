import {
  getFileNameFromUrl,
  createErrorMessage,
  createThrowErrorFunction,
  log,
  toArray,
} from '@cphayim-enc/shared'

import type { UploadedFile, UploadFormItem, UploadTransformer } from './UploadFormItem'

/**
 * 默认 upload 转换器
 * - `UploadedFile[]` <-> `UploadedFile[]`
 */
export const defaultUploadTransformer: UploadTransformer<UploadedFile> = {
  from: (file) => file,
  to: (file) => file,
}

/**
 * 创建字符串拼接 value 转换器
 * - ['url1', 'url2', 'url3'] <-> UploadedFile[]
 * - separator: ',' -> `url1,url2,url3` <-> UploadedFile[]
 */
export const createStringUploadTransformer = (separator?: string): UploadTransformer<string> => ({
  separator,
  from: (file) => ({
    url: file,
    name: getFileNameFromUrl(file),
  }),
  to: (file) => file.url,
})

/**
 * 校验是否是合法的 UploadedFile
 */
export function verifyUploadedFile(file: UploadedFile) {
  if (!file || typeof file.url !== 'string') {
    throw new Error(
      createErrorMessage(`"verifyUploadedFile" failed, ${file} is not a valid UploadedFile type`),
    )
  }
}

export class UploadTransformerHelper {
  private static NO_IMPLEMENT_FROM = createThrowErrorFunction(
    '`UploadFormItem.uploadTransformer.from` is not implemented',
  )
  private static NO_IMPLEMENT_TO = createThrowErrorFunction(
    '`UploadFormItem.uploadTransformer.to` is not implemented',
  )

  /**
   * `raw` -> `UploadedFile[]`
   * 无论 `UploadFormItem.uploadMultiple` 是否为 `true`，都将 raw 转换为 `UploadedFile[]`
   */
  static fromRaw(raw: unknown, item: UploadFormItem): UploadedFile[] {
    const transformer: UploadTransformer = item.uploadTransformer ?? defaultUploadTransformer

    if (!raw) return []

    if (!item.uploadMultiple && Array.isArray(raw)) {
      log.warn(
        '`UploadTransformerHelper.fromRaw`: `raw` is an array, but `UploadFormItem.uploadMultiple` is false',
      )
    }

    if (item.uploadMultiple && transformer.separator) {
      raw = (raw as string).split(transformer.separator)
    }

    return (Array.isArray(raw) ? raw : toArray(raw)).map(
      transformer.from ?? UploadTransformerHelper.NO_IMPLEMENT_FROM,
    )
  }

  /**
   * `UploadedFile[]` -> `raw`
   */
  static toRaw(files: UploadedFile[], item: UploadFormItem) {
    const transformer: UploadTransformer = item.uploadTransformer ?? defaultUploadTransformer

    const rawList = files.map(transformer.to ?? UploadTransformerHelper.NO_IMPLEMENT_TO)

    if (item.uploadMultiple) {
      // `item.uploadMultiple` -> true
      return transformer.separator ? rawList.join(transformer.separator) : rawList
    } else {
      // `item.uploadMultiple` -> false
      return rawList.pop()
    }
  }
}
