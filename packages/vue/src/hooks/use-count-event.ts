import { ref } from 'vue'
import { createErrorMessage } from '@cphayim-enc/shared'

/**
 * 比较数值：
 *
 * - `number`：等于
 * - `>${number}`：大于
 * - `<${number}`：小于
 * - `>=${number}`：大于等于
 * - `<=${number}`：小于等于
 * - `number` 可以为负数，当它为小数时，小数部分会被丢弃
 * - 数值前后可以存在空格
 */
type CompareNumber = `${number}` | `>${number}` | `<${number}` | `>=${number}` | `<=${number}`

export enum CompareOperator {
  Equal = '==',
  GreaterThan = '>',
  LessThan = '<',
  GreaterThanOrEqual = '>=',
  LessThanOrEqual = '<=',
}

export type CountEventHandler = (count: number, ...args: unknown[]) => void | Promise<void>
export type CountEventHandlerMap = Record<CompareNumber, CountEventHandler>

export type UseCountEventOptions = {
  /**
   * 初始计数
   * @default 0
   */
  initCount?: number
  /**
   * 是否在触发事件时重置计数
   * @default false
   */
  resetCountOnTrigger?: boolean
  /**
   * 超时重置计数时间，毫秒，0 表示不重置
   * @default 0
   */
  resetCountOnTimeout?: number
  /**
   * 是否初始化时执行一次检查，如果 handlerMap 中存在不合法的 compareNumber，会抛出异常
   * @default true
   */
  initInspect?: boolean
}

export function useCountEvent<T extends unknown[]>(
  handlerMap: CountEventHandlerMap,
  {
    initCount = 0,
    resetCountOnTrigger = false,
    resetCountOnTimeout = 0,
    initInspect = true,
  }: UseCountEventOptions = {},
): (...args: T) => Promise<void> {
  const count = ref(initCount)

  // 初始化校验
  if (initInspect) {
    Object.keys(handlerMap).forEach((compareNumber) =>
      parseCompareNumber(compareNumber as CompareNumber),
    )
  }

  return async (...args) => {
    count.value++

    // 超时重置计数
    if (resetCountOnTimeout) {
      setTimeout(() => (count.value = initCount), resetCountOnTimeout)
    }

    // 是否有事件回调被触发了
    const isTrigger = await dispatchAll(count.value, handlerMap, ...args)

    // 触发后重置计数
    if (isTrigger && resetCountOnTrigger) {
      count.value = initCount
    }
  }
}

export async function dispatchAll(
  count: number,
  handlerMap: CountEventHandlerMap,
  ...args: unknown[]
): Promise<boolean> {
  let isTrigger = false
  for (const [compareNumber, handler] of Object.entries(handlerMap)) {
    const [operator, value] = parseCompareNumber(compareNumber as CompareNumber)
    const result = await dispatch(count, operator, value, handler, ...args)
    isTrigger = isTrigger || result
  }
  return isTrigger
}

export async function dispatch(
  count: number,
  operator: CompareOperator,
  value: number,
  handler: CountEventHandler,
  ...args: unknown[]
): Promise<boolean> {
  if (
    (operator === CompareOperator.Equal && count === value) ||
    (operator === CompareOperator.GreaterThan && count > value) ||
    (operator === CompareOperator.LessThan && count < value) ||
    (operator === CompareOperator.GreaterThanOrEqual && count >= value) ||
    (operator === CompareOperator.LessThanOrEqual && count <= value)
  ) {
    try {
      await handler(count, ...args)
    } catch (error) {
      console.error(error)
    }
    // 无论是否异常都应该返回执行过的标记
    return true
  } else {
    return false
  }
}

export function parseCompareNumber(compareNumber: CompareNumber): [CompareOperator, number] {
  /**
   * - 可以不存在操作符
   * - 数字允许为负数
   * - 开头,中间,结尾允许空格
   */
  const pattern = /^\s*([<>]=?|>)?\s*(-?\d*\.?\d+)\s*$/
  const match = compareNumber.match(pattern)

  if (!match)
    throw new Error(createErrorMessage(`'useCountEvent' Invalid compare number: ${compareNumber}`))

  // '1' -> [undefined, 1] -> ['==', 1]
  const operator = (match[1] ?? CompareOperator.Equal) as CompareOperator
  // 直接取整丢弃小数部分
  const value = ~~match[2]

  return [operator, value]
}
