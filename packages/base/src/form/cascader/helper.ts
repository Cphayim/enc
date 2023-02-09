import type { CascaderFormItemOption } from './CascaderFormItem'

export class CascaderHelper {
  /**
   * 根据 value 值获取其在级联选项中的的路径选项（数组）
   */
  static getOptionsPathByValue = (
    options: CascaderFormItemOption[],
    value?: CascaderFormItemOption['value'],
  ): CascaderFormItemOption[] => {
    if (!value || !options.length) return []

    const _getOptionsPathByValue = (
      options: CascaderFormItemOption[],
    ): CascaderFormItemOption[] | undefined => {
      for (const option of options) {
        if (option.value === value) {
          return [option]
        }

        if (option.children) {
          const selectedOptions = _getOptionsPathByValue(option.children)
          if (selectedOptions) {
            return [option, ...selectedOptions]
          }
        }
      }
      return undefined
    }

    return _getOptionsPathByValue(options) ?? []
  }
}
