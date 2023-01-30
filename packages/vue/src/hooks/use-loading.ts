import { useEventLock } from './use-event-lock'

export type UseLoadingOptions = {
  /**
   * 附加事件锁 useEventLock
   * @default true
   */
  useLock?: boolean
  /**
   * 是否吞掉错误，如果想在外围捕获错误，需要设置为 false
   * @default true
   */
  catchError?: boolean
  /**
   * 等待提示
   * @default '加载中...'
   */
  message?: string
  /**
   * 成功提示
   */
  successMessage?: string
  /**
   * 失败提示
   */
  errorMessage?: string
  /**
   * 执行 loading 的回调函数
   */
  onLoading?: (message?: string) => any | Promise<any>
  /**
   * 清除 loading 的回调函数，传入 onLoading 的返回值
   */
  onClearLoading?: (flag: any) => void | Promise<void>
  /**
   * 成功回调
   */
  onSuccess?: (message?: string) => void | Promise<void>
  /**
   * 失败回调
   */
  onError?: (message?: string) => void | Promise<void>
}

const DEFAULT_OPTIONS: UseLoadingOptions = {
  message: '加载中...',
  useLock: true,
  catchError: true,
}

export function useLoading<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  {
    useLock = DEFAULT_OPTIONS.useLock,
    catchError = DEFAULT_OPTIONS.catchError,
    message = DEFAULT_OPTIONS.message,
    successMessage,
    errorMessage,
    onLoading,
    onClearLoading,
    onSuccess,
    onError,
  }: UseLoadingOptions = DEFAULT_OPTIONS,
): (...args: T) => Promise<void> {
  fn = useLock ? useEventLock(fn) : fn
  return async (...args) => {
    const flag = onLoading?.(message)
    try {
      await fn(...args)
      onClearLoading?.(flag)
      successMessage && onSuccess?.(successMessage)
    } catch (err: any) {
      onClearLoading?.(flag)
      if (errorMessage || err.message) {
        onError?.(errorMessage || err.message)
      }

      if (catchError) console.warn(err)
      else throw err
    }
  }
}
