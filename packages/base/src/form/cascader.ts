import type { PopupFormItem } from './popup'

/**
 * 级联选择表单项类型
 */
export interface CascaderFormItem<F = string, E = any> extends PopupFormItem<F, E> {
  /**
   * @override
   */
  type: 'cascader'
  /**
   * 是否多选
   *
   * 移动端不支持
   * @default false
   */
  cascaderMultiple?: boolean
  /**
   * 多选时最多可选个数，0 为不限制
   * @default 0
   */
  cascaderMultipleLimit?: number
  /**
   * 是否支持搜索过滤
   *
   * 由 UI package 决定是否支持，如果不支持，将会忽略该配置
   */
  cascaderFilterable?: boolean
  /**
   * 选择项
   * @default []
   */
  cascaderOptions?: CascaderFormItemOption[]

  /**
   * 是否支持选中任意一级选项，默认只能选中叶子节点
   *
   * 移动端不支持
   * @default false
   */
  cascaderCheckStrictly?: boolean
  /**
   * 是否返回选中值的完整路径值（即各级父级选项的值组成的数组）若为 false，值仅包含选中项的值
   * @default false
   */
  cascaderEmitPath?: boolean
}

export type CascaderFormItemOption = {
  /**
   * 显示用文本
   */
  label: string
  /**
   * 值，注意：该值在整个树中必须是唯一值
   */
  value: string | number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 子选项
   */
  children?: CascaderFormItemOption[]
}

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
