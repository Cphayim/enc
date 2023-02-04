import { describe, expect, it, vi } from 'vitest'

const confirmFn = vi.fn()

vi.mock('element-plus', async () => {
  return {
    ElMessageBox: {
      confirm: confirmFn,
    },
  }
})

const { useConfirm } = await import('../use-confirm')

describe('useLoading', async () => {
  it('should use ElMessageBox', async () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const wrappedFn = useConfirm({
      message: 'test message',
      title: 'test title',
      confirmText: 'test confirm text',
      cancelText: 'test cancel text',
      onConfirm,
      onCancel,
    })
    await wrappedFn('123')
    expect(confirmFn).toBeCalledTimes(1)
    expect(confirmFn.mock.calls[0][0]).toMatchObject('test message')
    expect(confirmFn.mock.calls[0][1]).toMatchObject('test title')
    expect(confirmFn.mock.calls[0][2]).toMatchObject({
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'test confirm text',
      cancelButtonText: 'test cancel text',
    })
    expect(onConfirm).toBeCalledTimes(1)
    expect(onConfirm).toBeCalledWith('123')
    expect(onCancel).toBeCalledTimes(0)

    confirmFn.mockImplementationOnce(() => Promise.reject())
    await wrappedFn('456')
    expect(confirmFn).toBeCalledTimes(2)
    expect(confirmFn.mock.calls[1][0]).toMatchObject('test message')
    expect(confirmFn.mock.calls[1][1]).toMatchObject('test title')
    expect(confirmFn.mock.calls[1][2]).toMatchObject({
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'test confirm text',
      cancelButtonText: 'test cancel text',
    })
    expect(onConfirm).toBeCalledTimes(1)
    expect(onCancel).toBeCalledTimes(1)
    expect(onCancel).toBeCalledWith('456')
  })
})
