import { showConfirmDialog } from 'vant'
import 'vant/es/dialog/style/index'
import { useConfirm as _useConfirm, type UseConfirmOptions } from '@cphayim-enc/vue'

export type { UseConfirmOptions }

export function useConfirm<T extends unknown[]>(
  options?: UseConfirmOptions<T>,
): (...args: T) => Promise<void> {
  return _useConfirm({
    confirmor: async (args) => {
      try {
        await showConfirmDialog({
          title: args.title,
          message: args.message,
          confirmButtonText: args.confirmText,
          cancelButtonText: args.cancelText,
          showConfirmButton: true,
          showCancelButton: true,
        })
        return true
      } catch (error) {
        return false
      }
    },
    ...options,
  })
}
