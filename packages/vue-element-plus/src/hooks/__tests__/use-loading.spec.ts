import { describe, expect, it, vi } from 'vitest'
import { createConsoleSpy } from '@cphayim-enc/test-utils'

const closeFn = vi.fn()
const ElMessageSpy = vi.fn((_: any) => ({ close: closeFn }))

vi.mock('element-plus', async () => {
  const module = await vi.importActual<typeof import('element-plus')>('element-plus')

  return {
    ...module,
    ElMessage: ElMessageSpy,
  }
})

const { useLoading } = await import('../use-loading')

describe('useLoading', async () => {
  it('should use ElMessage on success', async () => {
    createConsoleSpy()

    const fn = vi.fn()
    const wrappedFn = useLoading(fn, {
      message: 'test loading',
      successMessage: 'test success',
      errorMessage: 'test error',
    })
    await wrappedFn()
    expect(fn).toHaveBeenCalled()
    expect(ElMessageSpy.mock.calls[0][0]).toMatchObject({ message: 'test loading', type: 'info' })
    expect(closeFn).toHaveBeenCalled()
    expect(ElMessageSpy.mock.calls[1][0]).toMatchObject({
      message: 'test success',
      type: 'success',
    })
  })

  it('should use ElMessage on error', async () => {
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
    expect(ElMessageSpy.mock.calls[0][0]).toMatchObject({ message: 'test loading', type: 'info' })
    expect(closeFn).toHaveBeenCalled()
    expect(ElMessageSpy.mock.calls[1][0]).toMatchObject({
      message: 'test error',
      type: 'error',
    })
  })
})
