import { describe, expect, it, vi } from 'vitest'

const showConfirmDialogSpy = vi.fn()

vi.mock('vant', async () => {
  return {
    showConfirmDialog: showConfirmDialogSpy,
  }
})

const { useConfirm } = await import('../use-confirm')

describe('useLoading', async () => {
  it('should use showConfirmDialog', async () => {
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
    expect(showConfirmDialogSpy).toBeCalledTimes(1)
    expect(showConfirmDialogSpy.mock.lastCall![0]).toMatchObject({
      title: 'test title',
      message: 'test message',
      confirmButtonText: 'test confirm text',
      cancelButtonText: 'test cancel text',
      showConfirmButton: true,
      showCancelButton: true,
    })
    expect(onConfirm).toBeCalledTimes(1)
    expect(onConfirm).toBeCalledWith('123')
    expect(onCancel).toBeCalledTimes(0)

    showConfirmDialogSpy.mockImplementationOnce(() => Promise.reject())
    await wrappedFn('456')
    expect(showConfirmDialogSpy).toBeCalledTimes(2)
    expect(showConfirmDialogSpy.mock.lastCall![0]).toMatchObject({
      title: 'test title',
      message: 'test message',
      confirmButtonText: 'test confirm text',
      cancelButtonText: 'test cancel text',
      showConfirmButton: true,
      showCancelButton: true,
    })
    expect(onConfirm).toBeCalledTimes(1)
    expect(onCancel).toBeCalledTimes(1)
    expect(onCancel).toBeCalledWith('456')
  })
})
