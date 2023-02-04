import { ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import { useConfirm as _useConfirm, type UseConfirmOptions } from '@cphayim-enc/vue'

export type { UseConfirmOptions }

export function useConfirm<T extends unknown[]>(
  options?: UseConfirmOptions<T>,
): (...args: T) => Promise<void> {
  return _useConfirm({
    confirmor: async (args) => {
      try {
        await ElMessageBox.confirm(args.message, args.title, {
          type: 'info',
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
