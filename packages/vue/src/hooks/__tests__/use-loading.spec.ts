import { describe, expect, it, vi } from 'vitest'

import { sleep } from '@cphayim-enc/shared'
import { useLoading } from '../use-loading'
import { createConsoleSpy } from '@cphayim-enc/test-utils'

describe('useLoading', () => {
  const fn = vi.fn().mockImplementation(async () => {
    await sleep(1)
  })

  it('should be able to lock ', () => {
    const wrappedFn = useLoading(fn)
    wrappedFn()
    wrappedFn()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be able to leave it unlocked', () => {
    const wrappedFn = useLoading(fn, { useLock: false })
    wrappedFn()
    wrappedFn()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should call onLoading and onClearLoading callback', async () => {
    const onLoading = vi.fn().mockImplementation((_: string) => 'test')
    const onClearLoading = vi.fn((_: any) => void 0)

    const wrappedFn = useLoading(fn, { onLoading, onClearLoading })
    await wrappedFn()
    expect(onLoading).toHaveBeenCalledTimes(1)
    expect(onLoading).toHaveBeenCalledWith('加载中...')
    expect(onClearLoading).toHaveBeenCalledTimes(1)
    expect(onClearLoading).toHaveBeenCalledWith('test')

    const wrappedFn2 = useLoading(fn, { message: 'test loading...', onLoading, onClearLoading })
    await wrappedFn2()
    expect(onLoading).toHaveBeenCalledTimes(2)
    expect(onLoading).toHaveBeenCalledWith('test loading...')
    expect(onClearLoading).toHaveBeenCalledTimes(2)
    expect(onClearLoading).toHaveBeenCalledWith('test')
  })

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn().mockImplementation((_: string) => void 0)

    const wrappedFn = useLoading(fn, { onSuccess })
    await wrappedFn()
    expect(onSuccess).toHaveBeenCalledTimes(0) // because not pass `successMessage`

    const wrappedFn2 = useLoading(fn, { successMessage: '成功', onSuccess })
    await wrappedFn2()
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onSuccess).toHaveBeenCalledWith('成功')
  })

  it('should call onError callback', async () => {
    const { warn } = createConsoleSpy()

    const errorFn = vi.fn().mockImplementation(() => {
      throw new Error('错误消息')
    })
    const onClearLoading = vi.fn((_: any) => void 0)
    const onError = vi.fn().mockImplementation((_: string) => void 0)

    // 默认 `catchError: true`，错误被吞掉，打印警告
    const wrappedFn = useLoading(errorFn, { onError, onClearLoading })
    await wrappedFn()
    expect(warn).toHaveBeenCalledTimes(1)
    expect(onClearLoading).toHaveBeenCalledTimes(1) // 错误时也会调用 `onClearLoading`
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith('错误消息') // 没有传入 `errorMessage`，传递错误消息给 `onError`

    const wrappedFn2 = useLoading(errorFn, { errorMessage: '失败提示', onError })
    await wrappedFn2()
    expect(warn).toHaveBeenCalledTimes(2)
    expect(onError).toHaveBeenCalledTimes(2)
    expect(onError).toHaveBeenCalledWith('失败提示')

    // 不吞掉错误，抛出错误
    const wrappedFn3 = useLoading(errorFn, { catchError: false, errorMessage: '失败提示', onError })
    await expect(wrappedFn3()).rejects.toThrow('错误消息')
    expect(warn).toHaveBeenCalledTimes(2)
    expect(onError).toHaveBeenCalledTimes(3)
    expect(onError).toHaveBeenCalledWith('失败提示')
  })
})
