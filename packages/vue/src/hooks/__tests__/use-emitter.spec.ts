import { describe, expect, it, vi } from 'vitest'

import { useEmitter } from '../use-emitter'

describe('useEmitter', () => {
  it('should be able to subscribe to and publish events', () => {
    const emitter = useEmitter<{ foo: undefined; bar: string }>()
    const handleFoo = vi.fn()
    const handleBar = vi.fn().mockImplementation((_: string) => void 0)

    emitter.on('foo', handleFoo)
    emitter.on('bar', handleBar)

    emitter.emit('foo')
    expect(handleFoo).toHaveBeenCalledTimes(1)
    emitter.emit('bar', 'baz')
    expect(handleBar).toHaveBeenCalledTimes(1)
    expect(handleBar).toHaveBeenCalledWith('baz')

    emitter.emit('foo')
    expect(handleFoo).toHaveBeenCalledTimes(2)
    emitter.emit('bar', 'baz')
    expect(handleBar).toHaveBeenCalledTimes(2)
    expect(handleBar).toHaveBeenCalledWith('baz')
  })

  it('should be able to unsubscribe from events', () => {
    const emitter = useEmitter<{ foo: undefined }>()
    const handleFoo = vi.fn()

    emitter.on('foo', handleFoo)
    emitter.off('foo', handleFoo)

    emitter.emit('foo')
    expect(handleFoo).not.toHaveBeenCalled()
  })

  it('should be able to add multiple processing callbacks', () => {
    const emitter = useEmitter<{ foo: undefined }>()
    const handleFoo1 = vi.fn()
    const handleFoo2 = vi.fn()

    emitter.on('foo', handleFoo1)
    emitter.on('foo', handleFoo2)

    emitter.emit('foo')
    expect(handleFoo1).toHaveBeenCalledTimes(1)
    expect(handleFoo2).toHaveBeenCalledTimes(1)
  })
})
