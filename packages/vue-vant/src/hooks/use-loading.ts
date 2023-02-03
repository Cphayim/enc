import { showLoadingToast, showToast } from 'vant'
import 'vant/es/toast/style/index'

import { useLoading as _useLoading } from '@cphayim-enc/vue'
import type { UseLoadingOptions } from '@cphayim-enc/vue'

const DEFAULT_DURATION = 3000

export function useLoading<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  options?: UseLoadingOptions,
): (...args: T) => Promise<void> {
  return _useLoading(fn, {
    onLoading: (message) => {
      return showLoadingToast({ message, duration: 0 })
    },
    onClearLoading: (flag: ReturnType<typeof showToast>) => {
      flag.close()
    },
    onSuccess: (message) => {
      showToast({ message, duration: options?.duration ?? DEFAULT_DURATION })
    },
    onError: (message) => {
      showToast({ message, duration: options?.duration ?? DEFAULT_DURATION })
    },
    ...options,
  })
}
