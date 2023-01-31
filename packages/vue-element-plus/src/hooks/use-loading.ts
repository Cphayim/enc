import { ElMessage, MessageHandler } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { Loading } from '@element-plus/icons-vue'

import { useLoading as _useLoading } from '@cphayim-enc/vue'
import type { UseLoadingOptions } from '@cphayim-enc/vue'

const DURATION = 3000

export function useLoading<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  options: UseLoadingOptions,
): (...args: T) => Promise<void> {
  return _useLoading(fn, {
    onLoading: (message) => {
      return ElMessage({ type: 'info', message, duration: 0, icon: Loading })
    },
    onClearLoading: (flag: MessageHandler) => {
      flag.close()
    },
    onSuccess: (message) => {
      ElMessage({ type: 'success', message, duration: DURATION })
    },
    onError: (message) => {
      ElMessage({ type: 'error', message, duration: DURATION })
    },
    ...options,
  })
}
