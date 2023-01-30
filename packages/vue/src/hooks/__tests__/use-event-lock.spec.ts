import { describe, expect, it, vi } from 'vitest'

import { sleep } from '@cphayim-enc/shared'
import { useEventLock } from '../use-event-lock'

describe('useEventLock', () => {
  it('should not repeat called with wrapped function', async () => {
    const fn = vi.fn().mockImplementation(async () => {
      await sleep(5)
    })
    const wrappedFn = useEventLock(fn)
    wrappedFn()
    wrappedFn()
    wrappedFn()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be unlocked after the call', async () => {
    const fn = vi.fn().mockImplementation(async () => {
      await sleep(5)
    })
    const wrappedFn = useEventLock(fn)
    await wrappedFn()
    expect(fn).toHaveBeenCalledTimes(1)
    wrappedFn()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should be unlocked when an exception is thrown', () => {
    const fn = vi.fn().mockImplementation(() => {
      throw new Error('test')
    })
    const wrappedFn = useEventLock(fn)
    expect(wrappedFn).rejects.toThrow('test')
    expect(fn).toHaveBeenCalledTimes(1)

    expect(wrappedFn).rejects.toThrow('test')
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
