import {
  createErrorMessage,
  createThrowErrorFunction,
  getFileNameFromUrl,
  log,
} from '@cphayim-enc/shared'

import type { BaseFormItem } from './BaseFormItem'

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
   * 上传数量限制
   */
  uploadLimit?: number
  /**
   * 上传文件 mineType
   */
  uploadAccept?: string
  /**
   * 上传器底部提示文案，支持 \n 换行
   */
  uploadTips?: string

  /**
   * 自定义文件验证器函数
   *
   * 返回 true 表示验证通过，字符串为验证失败的提示文字
   */
  uploadValidate?: (file: File) => boolean | string

  /**
   * 自定义上传请求函数（必传）
   *
   * 在该函数内用户需实现文件的上传请求，之后返回一个 Promise<UploadedFile>
   */
  uploadSend?: (file: File) => Promise<UploadedFile>

  /**
   * upload 转换器
   * - `from` 方法用于将表单值的单项类型转换为 `UploadedFile`
   * - `to` 方法用于将 `UploadedFile` 转换为表单值的单项类型
   * - [可选] `separator` 用于将多个份文件拆分和组合（如果表单值不是数组，是拼接字符串的话）
   * @default defaultUploadTransformer
   */
  uploadTransformer?: UploadTransformer
}

export type UploadFormItemType = 'file' | 'image'

export type UploadedFile = {
  /**
   * 文件名
   */
  name?: string
  /**
   * 文件 url
   */
  url: string
}

/**
 * upload 转换器
 * - `from` 方法用于将表单值的单项类型转换为 `UploadedFile`
 * - `to` 方法用于将 `UploadedFile` 转换为表单值的单项类型
 * - [可选] `separator` 用于将多个份文件拆分和组合（如果表单值不是数组，是拼接字符串的话）
 */
export type UploadTransformer<T = any> = {
  /**
   * 分隔符，用于将多个份文件拆分和组合
   *
   * 如果的上传值对应的表单 `value` 是一个字符串，请填写该字段，是一个数组则不需要
   *
   * @default ','
   */
  separator?: string
  /**
   * 将表单 `value` 转为组件内使用的数据结构，即 `UploadedFile`
   * - 将对表单 `value` 数组的每一项调用该方法
   * - 如果存在 `separator`，即 value 是字符串，将在 map 之前使用 `separator` 进行拆分
   */
  from: (file: T) => UploadedFile
  /**
   * 将组件内使用的数据结构，即 `UploadedFile` 转为表单 `value`
   * - 将对组件内的每个 `UploadedFile` 调用该方法
   * - 如果存在 `separator`， 即 value 是字符串，将在 map 之后使用 `separator` 进行组合
   */
  to: (file: UploadedFile) => T
}

/**
 * 默认 upload 适配器
 */
export const defaultUploadTransformer: UploadTransformer<UploadedFile> = {
  from: (file) => file,
  to: (file) => file,
}

/**
 * 创建字符串表单 value 转换器
 */
export const createStringResultUploadTransformer = (separator = ',') =>
  ({
    separator,
    from: (file) => ({
      url: file,
      name: getFileNameFromUrl(file),
    }),
    to: (file) => file.url,
  } as UploadTransformer<string>)

/**
 * 校验是否是合法的 UploadedFile
 */
export function verifyUploadedFile(file: UploadedFile) {
  if (!file || typeof file.url !== 'string') {
    log.warn(`${file} is not a valid UploadedFile type`)
    throw new Error(createErrorMessage('`verifyUploadedFile` failed'))
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
   * - 对 raw 上的所有项调用 `UploadTransformer.from` 方法，返回 `UploadedFile[]`
   * - 若 `UploadTransformer.separator` 存在，则 raw 是 string， 先将其拆分为数组
   */
  static fromRaw(raw: unknown, transformer: UploadTransformer): UploadedFile[] {
    if (!raw) return []

    if (transformer.separator) {
      raw = (raw as string).split(transformer.separator)
    }

    return (raw as unknown[]).map(transformer.from ?? UploadTransformerHelper.NO_IMPLEMENT_FROM)
  }

  /**
   * - 对 files 上的所有项调用 `UploadTransformer.to` 方法，返回 raw
   * - 若 `UploadTransformer.separator` 存在，则 raw 是 string，最后将其合并为字符串
   */
  static toRaw(files: UploadedFile[], transformer: UploadTransformer) {
    const raw = files.map(transformer.to ?? UploadTransformerHelper.NO_IMPLEMENT_TO)

    return transformer.separator ? raw.join(transformer.separator) : raw
  }
}
