import { ref } from 'vue'

/**
 * 事件锁，防止函数重复调用
 * @param fn
 * @returns
 */
export function useEventLock<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
): (...args: T) => Promise<void> {
  const lock = ref(false)
  return async (...args) => {
    if (lock.value) return
    lock.value = true
    try {
      await fn(...args)
    } finally {
      lock.value = false
    }
  }
}
