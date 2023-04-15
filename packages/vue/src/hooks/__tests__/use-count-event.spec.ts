import { describe, expect, it, vi } from 'vitest'

import { sleep } from '@cphayim-enc/shared'
import { createConsoleSpy } from '@cphayim-enc/test-utils'
import {
  CompareOperator,
  CountEventHandlerMap,
  dispatch,
  dispatchAll,
  parseCompareNumber,
  useCountEvent,
} from '../use-count-event'

describe('parseCompareNumber', () => {
  it('should parsed a conventional compare number', () => {
    expect(parseCompareNumber('1')).toEqual([CompareOperator.Equal, 1])
    expect(parseCompareNumber('>=12')).toEqual([CompareOperator.GreaterThanOrEqual, 12])
    expect(parseCompareNumber('<=123')).toEqual([CompareOperator.LessThanOrEqual, 123])
    expect(parseCompareNumber('>1234')).toEqual([CompareOperator.GreaterThan, 1234])
    expect(parseCompareNumber('<000345')).toEqual([CompareOperator.LessThan, 345])
  })

  it('should parsed a negative compare number', () => {
    expect(parseCompareNumber('-1')).toEqual([CompareOperator.Equal, -1])
    expect(parseCompareNumber('>=-12')).toEqual([CompareOperator.GreaterThanOrEqual, -12])
    expect(parseCompareNumber('<=-123')).toEqual([CompareOperator.LessThanOrEqual, -123])
    expect(parseCompareNumber('>-1234')).toEqual([CompareOperator.GreaterThan, -1234])
    expect(parseCompareNumber('<-000345')).toEqual([CompareOperator.LessThan, -345])
  })

  it('should parsed a decimal compare number, will get an integer', () => {
    expect(parseCompareNumber('1.1')).toEqual([CompareOperator.Equal, 1])
    expect(parseCompareNumber('>=-12.2')).toEqual([CompareOperator.GreaterThanOrEqual, -12])
    expect(parseCompareNumber('<=-123.3')).toEqual([CompareOperator.LessThanOrEqual, -123])
    expect(parseCompareNumber('>1234.4')).toEqual([CompareOperator.GreaterThan, 1234])
    expect(parseCompareNumber('<-000345.5')).toEqual([CompareOperator.LessThan, -345])
  })

  it('should throw an error when the compare number is invalid', () => {
    const errorMessage = (s: string) => `Invalid compare number: ${s}`

    expect(() => parseCompareNumber('' as any)).toThrow(errorMessage(''))
    expect(() => parseCompareNumber('1.' as any)).toThrow(errorMessage('1.'))
    expect(() => parseCompareNumber('1.1.1' as any)).toThrow(errorMessage('1.1.1'))
    expect(() => parseCompareNumber('=<1' as any)).toThrow(errorMessage('=<1'))
    expect(() => parseCompareNumber('>=1-' as any)).toThrow(errorMessage('>=1-'))
    expect(() => parseCompareNumber('>=abc' as any)).toThrow(errorMessage('>=abc'))
  })

  it('should parsed a containing spaces compare number', () => {
    expect(parseCompareNumber(' 1 ')).toEqual([CompareOperator.Equal, 1])
    expect(parseCompareNumber('>= 12 ')).toEqual([CompareOperator.GreaterThanOrEqual, 12])
    expect(parseCompareNumber('<=   123 ')).toEqual([CompareOperator.LessThanOrEqual, 123])
    expect(parseCompareNumber('>   1234    ')).toEqual([CompareOperator.GreaterThan, 1234])
    expect(parseCompareNumber('< -000345 ')).toEqual([CompareOperator.LessThan, -345])

    // 对于在操作符前加空格的情况，运行时做了适配
    expect(parseCompareNumber(' >=  -12 ' as any)).toEqual([
      CompareOperator.GreaterThanOrEqual,
      -12,
    ])
  })
})

describe('dispatch', () => {
  const fn = vi.fn().mockImplementation(async () => {
    await sleep(0)
  })

  it(`should dispatch an event, when count ${CompareOperator.Equal} value`, async () => {
    const [operator, value] = parseCompareNumber('1')
    {
      const isTrigger = await dispatch(0, operator, value, fn)
      expect(isTrigger).toBe(false)
      expect(fn).toHaveBeenCalledTimes(0)
    }
    fn.mockReset()
    {
      const isTrigger = await dispatch(1, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  it(`should dispatch an event, when count ${CompareOperator.GreaterThan} value`, async () => {
    const [operator, value] = parseCompareNumber('>1')
    {
      const isTrigger = await dispatch(1, operator, value, fn)
      expect(isTrigger).toBe(false)
      expect(fn).toHaveBeenCalledTimes(0)
    }
    fn.mockReset()
    {
      const [operator, value] = parseCompareNumber('>1')
      const isTrigger = await dispatch(2, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  it(`should dispatch an event, when count ${CompareOperator.GreaterThanOrEqual} value`, async () => {
    const [operator, value] = parseCompareNumber('>=1')
    {
      const isTrigger = await dispatch(0, operator, value, fn)
      expect(isTrigger).toBe(false)
      expect(fn).toHaveBeenCalledTimes(0)
    }
    fn.mockReset()
    {
      const isTrigger = await dispatch(1, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
    fn.mockReset()
    {
      const isTrigger = await dispatch(2, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  it(`should dispatch an event, when count ${CompareOperator.LessThan} value`, async () => {
    const [operator, value] = parseCompareNumber('<1')
    {
      const isTrigger = await dispatch(1, operator, value, fn)
      expect(isTrigger).toBe(false)
      expect(fn).toHaveBeenCalledTimes(0)
    }
    fn.mockReset()
    {
      const isTrigger = await dispatch(0, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  it(`should dispatch an event, when count ${CompareOperator.LessThanOrEqual} value`, async () => {
    const [operator, value] = parseCompareNumber('<=1')
    {
      const isTrigger = await dispatch(2, operator, value, fn)
      expect(isTrigger).toBe(false)
      expect(fn).toHaveBeenCalledTimes(0)
    }
    fn.mockReset()
    {
      const isTrigger = await dispatch(1, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
    fn.mockReset()
    {
      const isTrigger = await dispatch(0, operator, value, fn)
      expect(isTrigger).toBe(true)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  })

  it(`should be able catch error when dispatch an event`, async () => {
    const { error } = createConsoleSpy()

    const fn = vi.fn().mockImplementationOnce(async () => {
      throw new Error('test error')
    })

    const [operator, value] = parseCompareNumber('1')
    const isTrigger = await dispatch(1, operator, value, fn)
    expect(isTrigger).toBe(true)
    expect(error).toBeCalled()
    expect(error.mock.calls[0][0]).toMatch(/test error/)
  })
})

describe('dispatchAll', () => {
  const fn1 = vi.fn().mockImplementation(async () => {
    await sleep(0)
  })
  const fn2 = vi.fn().mockImplementation(async () => {
    await sleep(0)
  })
  const fn3 = vi.fn().mockImplementation(async () => {
    await sleep(0)
  })

  const handlerMap: CountEventHandlerMap = {
    '1': fn1,
    '>=1': fn2,
    '<0': fn3,
  }

  it('should dispatch all events', async () => {
    {
      const isTrigger = await dispatchAll(1, handlerMap)
      expect(isTrigger).toBe(true)
      expect(fn1).toHaveBeenCalledTimes(1)
      expect(fn2).toHaveBeenCalledTimes(1)
      expect(fn3).toHaveBeenCalledTimes(0)
    }
    fn1.mockReset()
    fn2.mockReset()
    fn3.mockReset()
    {
      const isTrigger = await dispatchAll(2, handlerMap)
      expect(isTrigger).toBe(true)
      expect(fn1).toHaveBeenCalledTimes(0)
      expect(fn2).toHaveBeenCalledTimes(1)
      expect(fn3).toHaveBeenCalledTimes(0)
    }
    fn1.mockReset()
    fn2.mockReset()
    fn3.mockReset()
    {
      const isTrigger = await dispatchAll(0, handlerMap)
      expect(isTrigger).toBe(false)
      expect(fn1).toHaveBeenCalledTimes(0)
      expect(fn2).toHaveBeenCalledTimes(0)
      expect(fn3).toHaveBeenCalledTimes(0)
    }
  })
})

describe('useCountEvent', () => {
  it('should be initialization inspect by default', () => {
    const handlerMap = {
      // invalid compare number
      '>1a': () => void 0,
    }

    expect(() => useCountEvent(handlerMap)).toThrow(`Invalid compare number: >1a`)

    // 可以手动禁用初始化检查，但错误将在 dispatch 阶段抛出
    expect(() => useCountEvent(handlerMap, { initInspect: false })).not.toThrow()
  })

  it('should be call handler when count met', async () => {
    const fn1 = vi.fn().mockImplementation(() => void 0)
    const fn2 = vi.fn().mockImplementation(() => void 0)
    const fn3 = vi.fn().mockImplementation(() => void 0)

    const wrapFn = useCountEvent({
      '>=0': fn1, // always trigger
      '>2': fn2,
      '<2': fn3, // only trigger 1 times
    })

    await wrapFn('test called', 'first')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenLastCalledWith(1, 'test called', 'first')
    expect(fn2).toHaveBeenCalledTimes(0)
    expect(fn3).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenLastCalledWith(1, 'test called', 'first')

    await wrapFn('test called', 'second')
    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn1).toHaveBeenLastCalledWith(2, 'test called', 'second')
    expect(fn2).toHaveBeenCalledTimes(0)
    expect(fn3).toHaveBeenCalledTimes(1)

    await wrapFn('test called', 'third')
    expect(fn1).toHaveBeenCalledTimes(3)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'third')
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenLastCalledWith(3, 'test called', 'third')
    expect(fn3).toHaveBeenCalledTimes(1)
  })

  it('should be able to set initCount', async () => {
    const fn1 = vi.fn().mockImplementation(() => void 0)

    const wrapFn = useCountEvent(
      {
        '>=5': fn1,
      },
      { initCount: 4 },
    )

    await wrapFn('test called', 'first')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenLastCalledWith(5, 'test called', 'first')
  })

  it('should be able to enable resetCountOnTrigger', async () => {
    const fn1 = vi.fn().mockImplementation(() => void 0)

    const wrapFn = useCountEvent(
      {
        '>=3': fn1,
      },
      {
        resetCountOnTrigger: true,
      },
    )

    await wrapFn('test called', 'first')
    await wrapFn('test called', 'second')
    await wrapFn('test called', 'third')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'third')

    await wrapFn('test called', 'fourth')
    expect(fn1).toHaveBeenCalledTimes(1) // not trigger, because count is reset

    await wrapFn('test called', 'fifth')
    await wrapFn('test called', 'sixth')
    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'sixth')
  })

  it('should be able to enable resetCountOnTrigger and set initCount', async () => {
    const fn1 = vi.fn().mockImplementation(() => void 0)

    const wrapFn = useCountEvent(
      {
        '3': fn1,
      },
      {
        resetCountOnTrigger: true,
        initCount: 2,
      },
    )

    await wrapFn('test called', 'first')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'first')

    await wrapFn('test called', 'second')
    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'second')
  })

  it('should be able to enable resetCountOnTimeout', async () => {
    const fn1 = vi.fn().mockImplementation(() => void 0)

    const wrapFn = useCountEvent(
      {
        '>=0': fn1,
      },
      {
        resetCountOnTimeout: 5,
      },
    )

    await wrapFn('test called', 'first')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenLastCalledWith(1, 'test called', 'first')

    await wrapFn('test called', 'second')
    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn1).toHaveBeenLastCalledWith(2, 'test called', 'second')

    await sleep(10)
    await wrapFn('test called', 'third')
    expect(fn1).toHaveBeenCalledTimes(3)
    expect(fn1).toHaveBeenLastCalledWith(1, 'test called', 'third')
  })

  it('should be able to enable resetCountOnTimeout and set initCount', async () => {
    const fn1 = vi.fn().mockImplementation(() => void 0)

    const wrapFn = useCountEvent(
      {
        '>=0': fn1,
      },
      {
        resetCountOnTimeout: 5,
        initCount: 2,
      },
    )

    await wrapFn('test called', 'first')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'first')

    await wrapFn('test called', 'second')
    expect(fn1).toHaveBeenCalledTimes(2)
    expect(fn1).toHaveBeenLastCalledWith(4, 'test called', 'second')

    await sleep(10)
    await wrapFn('test called', 'third')
    expect(fn1).toHaveBeenCalledTimes(3)
    expect(fn1).toHaveBeenLastCalledWith(3, 'test called', 'third')
  })
})
