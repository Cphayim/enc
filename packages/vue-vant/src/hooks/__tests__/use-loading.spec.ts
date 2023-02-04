import { describe, expect, it, vi } from 'vitest'
import { createConsoleSpy } from '@cphayim-enc/test-utils'

const closeFn = vi.fn()
const showToastSpy = vi.fn((_: any) => ({ close: closeFn }))

vi.mock('vant', async () => {
  const module = await vi.importActual<typeof import('vant')>('vant')

  return {
    ...module,
    showToast: showToastSpy,
    showLoadingToast: showToastSpy,
  }
})

const { useLoading } = await import('../use-loading')

describe('useLoading', async () => {
  it('should use showToast on success', async () => {
    createConsoleSpy()

    const fn = vi.fn()
    const wrappedFn = useLoading(fn, {
      message: 'test loading',
      successMessage: 'test success',
      errorMessage: 'test error',
    })
    await wrappedFn()
    expect(fn).toHaveBeenCalled()
    expect(showToastSpy).toBeCalledTimes(2) // loading + success
    expect(showToastSpy.mock.calls[0][0]).toMatchObject({ message: 'test loading' })
    expect(closeFn).toHaveBeenCalled()
    expect(showToastSpy.mock.calls[1][0]).toMatchObject({ message: 'test success' })
  })

  it('should use showToast on error', async () => {
    createConsoleSpy()

    const fn = vi.fn(() => {
      throw new Error()
    })
    const wrappedFn = useLoading(fn, {
      message: 'test loading',
      successMessage: 'test success',
      errorMessage: 'test error',
    })
    await wrappedFn()
    expect(fn).toHaveBeenCalled()
    expect(showToastSpy).toBeCalledTimes(2) // loading + error
    expect(showToastSpy.mock.calls[0][0]).toMatchObject({ message: 'test loading' })
    expect(closeFn).toHaveBeenCalled()
    expect(showToastSpy.mock.calls[1][0]).toMatchObject({ message: 'test error' })
  })
})
