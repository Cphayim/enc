import { showLoadingToast, showToast } from 'vant'

import { useLoading as _useLoading, UseLoadingOptions } from '@cphayim-enc/vue'

export { UseLoadingOptions }

const TOAST_DURATION = 3000

export function useLoading<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  options: UseLoadingOptions,
): (...args: T) => Promise<void> {
  return _useLoading(fn, {
    onLoading: (message) => {
      showLoadingToast(message as string)
    },
    onClearLoading: (flag: ReturnType<typeof showToast>) => {
      flag.close()
    },
    onSuccess: (message) => {
      showToast({ message, duration: TOAST_DURATION })
    },
    onError: (message) => {
      showToast({ message, duration: TOAST_DURATION })
    },
    ...options,
  })
}
