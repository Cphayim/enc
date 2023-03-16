import { describe, expect, it } from 'vitest'

import { getFileNameFromUrl } from '@cphayim-enc/shared'
import { createConsoleSpy } from '@cphayim-enc/test-utils'

import {
  defaultUploadTransformer,
  createStringUploadTransformer,
  verifyUploadedFile,
  UploadFormItem,
  UploadTransformerHelper,
} from '..'

it(`should be able verify a uploadedFile`, () => {
  expect(() => verifyUploadedFile({ url: 'https://test.com/a.png' })).not.toThrowError()
  expect(() =>
    verifyUploadedFile({ url: 'https://test.com/a.png', name: 'a.png' }),
  ).not.toThrowError()
  expect(() => verifyUploadedFile({ name: '' } as any)).toThrowError()
  expect(() => verifyUploadedFile('https://test.com/a.png' as any)).toThrowError()
})

describe(`Built-in transformer`, () => {
  // defaultUploadTransformer
  // from: UploadedFile -> UploadedFile
  // to: UploadedFile -> UploadedFile
  it('should give the same result with `defaultUploadTransformer` `from` and `to` method', () => {
    const raw = { url: 'https://test.com/a.png' }
    const uploadedFile = defaultUploadTransformer.from(raw)
    expect(uploadedFile).toBe(raw) // 直接返回自身

    const raw2 = defaultUploadTransformer.to(uploadedFile)
    expect(raw2).toBe(raw) // 直接返回自身
  })

  // stringUploadTransformer
  // from: string -> UploadedFile
  // to: UploadedFile -> string
  it('should be able to convert string <-> UploadedFile via `stringUploadTransformer`', () => {
    // 没有 separator
    expect(createStringUploadTransformer().separator).toBeUndefined()
    // 有 separator
    expect(createStringUploadTransformer(',').separator).toBe(',')
    expect(createStringUploadTransformer('::').separator).toBe('::')

    const stringUploadTransformer = createStringUploadTransformer()
    const raw = 'https://test.com/a.png'
    const uploadedFile = stringUploadTransformer.from(raw)

    expect(() => verifyUploadedFile(uploadedFile)).not.toThrow()
    expect(uploadedFile.url).toBe(raw)
    expect(uploadedFile.name).toBe(getFileNameFromUrl(raw))

    const raw2 = stringUploadTransformer.to(uploadedFile)
    expect(raw2).toBe(uploadedFile.url)
    expect(raw2).toBe(raw)
  })
})

describe(`UploadTransformerHelper`, () => {
  const DEFAULT_ITEM: UploadFormItem = {
    type: 'upload',
    name: 'file',
    label: 'File',
  }

  /**
   * `uploadMultiple: false` + `uploadTransformer: undefined` (defaultTransformer)
   *
   * fromRaw: 外部值 -> 内部值
   * - undefined -> []
   * - UploadedFile -> [UploadedFile]
   * - UploadedFile[] -> UploadedFile[] (打印警告)
   *
   * toRaw: 内部值 -> 外部值
   * - [] -> undefined
   * - [UploadedFile] -> UploadedFile
   * - [UploadedFile, UploadedFile] -> UploadedFile (仅保留最后一个)
   */
  it('use defaultTransformer with single file UploadFormItem', () => {
    const consoleSpy = createConsoleSpy()

    const SINGLE_FILE_ITEM: UploadFormItem = { ...DEFAULT_ITEM }
    const rawUploadedFile = { url: 'https://test.com/a.png' }
    const rawUploadedFile2 = { url: 'https://test.com/b.png' }

    // `UploadTransformerHelper.fromRaw` 总是返回数组 `UploadedFile[]`
    // fromRaw: undefined -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(undefined, SINGLE_FILE_ITEM)).toEqual([])
    // fromRaw: UploadedFile -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(rawUploadedFile, SINGLE_FILE_ITEM)).toEqual([
      rawUploadedFile,
    ])
    // formRaw 在接收一个数组，但未指定 `item.uploadMultiple -> true` 时，将打印警告
    // fromRaw: UploadedFile[] -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw([rawUploadedFile], SINGLE_FILE_ITEM)).toEqual([
      rawUploadedFile,
    ])
    expect(UploadTransformerHelper.fromRaw([], SINGLE_FILE_ITEM)).toEqual([])
    // 上面的两次转换将打印警告
    expect(consoleSpy.warn).toBeCalledTimes(2)

    // toRaw: UploadedFile[] -> UploadedFile
    expect(UploadTransformerHelper.toRaw([rawUploadedFile], SINGLE_FILE_ITEM)).toEqual(
      rawUploadedFile,
    )
    // toRaw 在接收多个元素的数组时，若未指定 `item.uploadMultiple -> true`，将仅返回最后一个元素
    expect(
      UploadTransformerHelper.toRaw([rawUploadedFile, rawUploadedFile2], SINGLE_FILE_ITEM),
    ).toEqual(rawUploadedFile2)
    expect(UploadTransformerHelper.toRaw([], SINGLE_FILE_ITEM)).toEqual(undefined) // [] -> undefined
  })

  /**
   * `uploadMultiple: true` + `uploadTransformer: undefined` (defaultTransformer)
   *
   * fromRaw: 外部值 -> 内部值
   * - undefined -> []
   * - UploadedFile -> [UploadedFile]
   * - UploadedFile[] -> UploadedFile[]
   *
   * toRaw: 内部值 -> 外部值
   * - [] -> undefined
   * - [UploadedFile] -> UploadedFile[]
   * - [UploadedFile, UploadedFile] -> UploadedFile[]
   */
  it('use defaultTransformer with multiple file UploadFormItem', () => {
    const consoleSpy = createConsoleSpy()

    const MULTIPLE_FILE_ITEM: UploadFormItem = { ...DEFAULT_ITEM, uploadMultiple: true }
    const rawUploadedFile = { url: 'https://test.com/a.png' }
    const rawUploadedFile2 = { url: 'https://test.com/b.png' }

    // `UploadTransformerHelper.fromRaw` 总是返回数组 `UploadedFile[]`
    // fromRaw: undefined -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(undefined, MULTIPLE_FILE_ITEM)).toEqual([])
    // fromRaw: UploadedFile -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(rawUploadedFile, MULTIPLE_FILE_ITEM)).toEqual([
      rawUploadedFile,
    ])
    // fromRaw: UploadedFile[] -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw([rawUploadedFile], MULTIPLE_FILE_ITEM)).toEqual([
      rawUploadedFile,
    ])
    expect(UploadTransformerHelper.fromRaw([], MULTIPLE_FILE_ITEM)).toEqual([])
    // 传入数组不会再打印警告
    expect(consoleSpy.warn).not.toBeCalled()

    // toRaw: UploadedFile[] -> UploadedFile[]
    expect(UploadTransformerHelper.toRaw([rawUploadedFile], MULTIPLE_FILE_ITEM)).toEqual([
      rawUploadedFile,
    ])
    expect(
      UploadTransformerHelper.toRaw([rawUploadedFile, rawUploadedFile2], MULTIPLE_FILE_ITEM),
    ).toEqual([rawUploadedFile, rawUploadedFile2])
    expect(UploadTransformerHelper.toRaw([], MULTIPLE_FILE_ITEM)).toEqual([]) // [] -> []
  })

  /**
   * `uploadMultiple: false` + `uploadTransformer: stringTransformer()`
   *
   * fromRaw: 外部值 -> 内部值
   * - undefined -> []
   * - "url" -> [UploadedFile]
   * - ["url1", "url2"] -> UploadedFile[] (打印警告)
   *
   * toRaw: 内部值 -> 外部值
   * - [] -> undefined
   * - [UploadedFile] -> "url"
   * - [UploadedFile, UploadedFile] -> "url2" (仅保留最后一个)
   */
  it('use stringTransformer with single file UploadFormItem', () => {
    const consoleSpy = createConsoleSpy()

    const SINGLE_STRING_FILE_ITEM: UploadFormItem = {
      ...DEFAULT_ITEM,
      uploadTransformer: createStringUploadTransformer(),
    }
    const rawString = 'https://test.com/a.png'
    const rawString2 = 'https://test.com/b.png'

    // fromRaw: undefined -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(undefined, SINGLE_STRING_FILE_ITEM)).toEqual([])
    // fromRaw: string -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(rawString, SINGLE_STRING_FILE_ITEM)).toEqual([
      { name: getFileNameFromUrl(rawString), url: rawString },
    ])

    // formRaw 在接收一个数组，但未指定 `item.uploadMultiple -> true` 时，将打印警告
    // fromRaw: [string] -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw([rawString], SINGLE_STRING_FILE_ITEM)).toEqual([
      { name: getFileNameFromUrl(rawString), url: rawString },
    ])
    expect(UploadTransformerHelper.fromRaw([], SINGLE_STRING_FILE_ITEM)).toEqual([])
    // 上面的两次转换将打印警告
    expect(consoleSpy.warn).toBeCalledTimes(2)

    // toRaw: UploadedFile[] -> string
    expect(UploadTransformerHelper.toRaw([{ url: rawString }], SINGLE_STRING_FILE_ITEM)).toEqual(
      rawString,
    )
    // toRaw 在接收多个元素的数组时，若未指定 `item.uploadMultiple -> true`，将仅返回最后一个元素
    expect(
      UploadTransformerHelper.toRaw(
        [{ url: rawString }, { url: rawString2 }],
        SINGLE_STRING_FILE_ITEM,
      ),
    ).toEqual(rawString2)
    expect(UploadTransformerHelper.toRaw([], SINGLE_STRING_FILE_ITEM)).toEqual(undefined) // [] -> undefined
  })

  /**
   * `uploadMultiple: true` + `uploadTransformer: stringTransformer()`
   *
   * fromRaw: 外部值 -> 内部值
   * - undefined -> []
   * - "url" -> [UploadedFile]
   * - ["url1", "url2"] -> UploadedFile[]
   *
   * toRaw: 内部值 -> 外部值
   * - [] -> undefined
   * - [UploadedFile] -> ["url"]
   * - [UploadedFile, UploadedFile] -> ["url", "url2"]
   */
  it('use stringTransformer with multiple file UploadFormItem', () => {
    const consoleSpy = createConsoleSpy()

    const MULTIPLE_STRING_FILE_ITEM: UploadFormItem = {
      ...DEFAULT_ITEM,
      uploadMultiple: true,
      uploadTransformer: createStringUploadTransformer(),
    }
    const rawString = 'https://test.com/a.png'
    const rawString2 = 'https://test.com/b.png'

    // fromRaw: undefined -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(undefined, MULTIPLE_STRING_FILE_ITEM)).toEqual([])
    // fromRaw: string -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(rawString, MULTIPLE_STRING_FILE_ITEM)).toEqual([
      { name: getFileNameFromUrl(rawString), url: rawString },
    ])

    // fromRaw: [string] -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw([rawString], MULTIPLE_STRING_FILE_ITEM)).toEqual([
      { name: getFileNameFromUrl(rawString), url: rawString },
    ])
    expect(UploadTransformerHelper.fromRaw([], MULTIPLE_STRING_FILE_ITEM)).toEqual([])
    // 传入数组不会再打印警告
    expect(consoleSpy.warn).not.toBeCalled()

    // toRaw: UploadedFile[] -> string[]
    expect(UploadTransformerHelper.toRaw([{ url: rawString }], MULTIPLE_STRING_FILE_ITEM)).toEqual([
      rawString,
    ])
    expect(
      UploadTransformerHelper.toRaw(
        [{ url: rawString }, { url: rawString2 }],
        MULTIPLE_STRING_FILE_ITEM,
      ),
    ).toEqual([rawString, rawString2])
    expect(UploadTransformerHelper.toRaw([], MULTIPLE_STRING_FILE_ITEM)).toEqual([]) // [] -> []
  })

  /**
   * `uploadMultiple: true` + `uploadTransformer: stringTransformer(',')`
   *
   * fromRaw: 外部值 -> 内部值
   * - undefined -> []
   * - "url" -> [UploadedFile]
   * - "url1,url2" -> UploadedFile[]
   *
   * toRaw: 内部值 -> 外部值
   * - [] -> undefined
   * - [UploadedFile] -> "url"
   * - [UploadedFile, UploadedFile] -> "url1,url2"
   */
  it('use separator stringTransformer with multiple file UploadFormItem', () => {
    const MULTIPLE_STRING_FILE_ITEM: UploadFormItem = {
      ...DEFAULT_ITEM,
      uploadMultiple: true,
      uploadTransformer: createStringUploadTransformer(','),
    }
    const rawString = 'https://test.com/a.png,https://test.com/b.png'

    // fromRaw: undefined -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(undefined, MULTIPLE_STRING_FILE_ITEM)).toEqual([])
    // fromRaw: "url1,url2" -> UploadedFile[]
    expect(UploadTransformerHelper.fromRaw(rawString, MULTIPLE_STRING_FILE_ITEM)).toEqual([
      { name: getFileNameFromUrl(rawString.split(',')[0]), url: rawString.split(',')[0] },
      { name: getFileNameFromUrl(rawString.split(',')[1]), url: rawString.split(',')[1] },
    ])

    // toRaw: UploadedFile[] -> "url1,url2"
    expect(
      UploadTransformerHelper.toRaw([{ url: rawString.split(',')[0] }], MULTIPLE_STRING_FILE_ITEM),
    ).toEqual(rawString.split(',')[0])
    expect(
      UploadTransformerHelper.toRaw(
        [{ url: rawString.split(',')[0] }, { url: rawString.split(',')[1] }],
        MULTIPLE_STRING_FILE_ITEM,
      ),
    ).toEqual(rawString)
    expect(UploadTransformerHelper.toRaw([], MULTIPLE_STRING_FILE_ITEM)).toEqual('') // [] -> ""
  })
})
