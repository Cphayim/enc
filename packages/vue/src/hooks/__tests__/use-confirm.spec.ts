import { describe, expect, it, vi } from 'vitest'

import { useConfirm } from '../use-confirm'

describe('useConfirm', () => {
  it('should be use default options', async () => {
    window.confirm = vi.fn().mockImplementation(() => true)

    const confirm = useConfirm()

    await confirm()
    // use window.confirm by default
    expect(window.confirm).toHaveBeenCalledTimes(1)
    expect(window.confirm).toHaveBeenCalledWith('提示\n确认执行此操作吗？')
  })

  it('should be call onConfirm', async () => {
    window.confirm = vi.fn().mockImplementation(() => true)

    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const confirm = useConfirm({ onConfirm, onCancel })

    await confirm('123')
    expect(window.confirm).toHaveBeenCalledTimes(1)
    expect(onConfirm).toBeCalled()
    expect(onConfirm).toBeCalledWith('123')
    expect(onCancel).not.toBeCalled()
  })

  it('should be call onCancel', async () => {
    window.confirm = vi.fn().mockImplementation(() => false)

    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const confirm = useConfirm({ onConfirm, onCancel })

    await confirm('123')
    expect(window.confirm).toHaveBeenCalledTimes(1)
    expect(onConfirm).not.toBeCalled()
    expect(onCancel).toBeCalled()
    expect(onCancel).toBeCalledWith('123')
  })

  it('should be use custom confirmor', async () => {
    const confirmor = vi.fn().mockImplementation(() => true)
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const confirm = useConfirm({
      title: 'test-title',
      message: 'test-message',
      confirmText: 'test-confirm',
      cancelText: 'test-cancel',
      confirmor,
      onConfirm,
      onCancel,
    })

    await confirm('123')
    expect(confirmor).toBeCalled()
    expect(confirmor.mock.calls[0][0]).toMatchObject({
      title: 'test-title',
      message: 'test-message',
      confirmText: 'test-confirm',
      cancelText: 'test-cancel',
    })
    expect(onConfirm).toBeCalled()
    expect(onConfirm).toBeCalledWith('123')
    expect(onCancel).not.toBeCalled()
  })
})
