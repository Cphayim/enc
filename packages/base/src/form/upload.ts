import {
  getFileNameFromUrl,
  createErrorMessage,
  createThrowErrorFunction,
  log,
  toArray,
} from '@cphayim-enc/shared'

import type { BaseFormItem } from './base'

/**
 * 上传表单项
 */
export interface UploadFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * @override
   */
  type: 'upload'
  /**
   * 上传类型，会影响上传组件的外观
   *
   * 由 UI Package 实现
   * @default 'file'
   */
  uploadType?: UploadFormItemType
  /**
   * 是否允许上传多个文件
   *
   * 这将会影响到 value 的数据结构和 `uploadTransformer` 的行为
   * - 当值为 `false` 时 value 为单个对象
   * - 当值为 `true` 时 value 为数组
   * @default false
   */
  uploadMultiple?: boolean
  /**
   * 上传数量限制，需要开启 `uploadMultiple` 才生效
   * @default 3
   */
  uploadMultipleLimit?: number
  /**
   * 上传文件 mineType
   */
  uploadAccept?: string
  /**
   * 上传器底部提示文案，支持 \n 换行
   */
  uploadTips?: string
  /**
   * 上传按钮文字，仅 type 为 file 时有效
   * @default '上传文件'
   */
  uploadButtonText?: string
  /**
   * 上传按钮文字颜色，仅 type 为 file 时有效
   * @default '#fff'
   */
  uploadButtonTextColor?: string
  /**
   * 上传按钮颜色，仅 type 为 file 时有效
   *
   * 由 UI Package 实现
   */
  uploadButtonColor?: string
  /**
   * 自定义文件验证器函数
   *
   * 返回 true 表示验证通过，字符串为验证失败的提示文字
   */
  uploadValidate?: (file: File) => boolean | string

  /**
   * 自定义上传请求函数（必传）
   *
   * 在该函数内用户需实现文件的上传请求，必须返回 Promise<UploadedFile>
   *
   * 当处理出现错误时，返回 Promise<string>，作为错误提示
   */
  uploadSend?: (file: File) => Promise<UploadedFile | string>

  /**
   * upload 内外部值转换器
   * - `from`: 外部值`T` -> 内部值`UploadedFile`
   * - `to`: 内部值 `UploadedFile` -> 外部值 `T`
   * - [可选] `separator` 将多个值拼接为字符串的分隔符
   * @default defaultUploadTransformer
   */
  uploadTransformer?: UploadTransformer
}

export type UploadFormItemType = 'file' | 'image'

export type UploadedFile = {
  /**
   * 文件 url
   */
  url: string
  /**
   * 文件名
   */
  name?: string
  /**
   * 额外数据
   */
  [key: string]: any
}

/**
 * Upload 内外部值转换器
 * 必须实现 `from` 和 `to` 方法
 */
export interface UploadTransformer<T = any> {
  /**
   * [可选] 用于拆分和拼接多个表单单项（`T extends string`）字符串的分隔符
   *
   * 传递该字段代表外部值是一个字符串拼接值，例如 `url1,url2,url3`
   * - 仅 `UploadFormItem.uploadMultiple` 为 `true` 时才会生效
   * - 在对每项调用 `UploadTransformer.from` 前使用 `rawValue.split(separator)` 拆分
   * - 在对每项调用 `UploadTransformer.to` 后使用 `uploadedFile.map(item => item.url).join(separator)` 拼接
   */
  separator?: string
  /**
   * 外部值 `T` -> 内部值 `UploadedFile`
   *
   * 将表单值的单项 T 类型转为 `UploadedFile` 类型
   * - 将对表单 `value` 数组的每一项调用该方法
   * - 如果存在 `separator`，即 value 是字符串，将在 map 之前使用 `separator` 进行拆分
   */
  from: (file: T) => UploadedFile
  /**
   * 内部值 `UploadedFile` -> 外部值 `T`
   *
   * 将 `UploadedFile` 类型转换为表单值的单项 `T` 类型
   * - 将对组件内的每个 `UploadedFile` 调用该方法
   * - 如果存在 `separator`， 即 value 是字符串，将在 map 之后使用 `separator` 进行组合
   */
  to: (file: UploadedFile) => T
}

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
