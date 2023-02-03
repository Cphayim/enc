export type ConfirmorArgs = {
  /**
   * 确认框标题
   * @default '提示'
   */
  title?: string
  /**
   * 确认框内容
   * @default '确认执行此操作吗？'
   */
  message?: string
  /**
   * 确认按钮文本
   * @default '确定'
   */
  confirmText?: string
  /**
   * 取消按钮文本
   * @default '取消'
   */
  cancelText?: string
}

export type Confirmor = (args: ConfirmorArgs) => boolean | Promise<boolean>

export type UseConfirmOptions<T extends unknown[] = unknown[]> = ConfirmorArgs & {
  /**
   * 确认时回调
   */
  onConfirm?: (...args: T) => void | Promise<void>
  /**
   * 取消时回调
   */
  onCancel?: (...args: T) => void | Promise<void>
  /**
   * 确认器
   * @default promiseConfirmor
   */
  confirmor?: Confirmor
}

const DEFAULT_OPTIONS: UseConfirmOptions = {
  title: '提示',
  message: '确认执行此操作吗？',
  confirmText: '确定',
  cancelText: '取消',
  confirmor: (args) => {
    const { title, message } = args
    return new Promise((resolve) => {
      // 浏览器自带 confirm
      const confirm = globalThis?.confirm(`${title}\n${message}`)
      resolve(!!confirm)
    })
  },
}

export function useConfirm<T extends unknown[]>(
  options?: UseConfirmOptions<T>,
): (...args: T) => Promise<void> {
  const { onConfirm, onCancel, ...confirmorArgs } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }
  return async (...args) => {
    const { confirmor } = confirmorArgs
    const result = await confirmor?.(confirmorArgs)
    if (result) {
      await onConfirm?.(...args)
    } else {
      await onCancel?.(...args)
    }
  }
}
