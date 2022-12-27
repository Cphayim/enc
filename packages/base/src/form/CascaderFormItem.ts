import type { PopupFormItem } from './PopupFormItem'

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
  label: string | number
  /**
   * 值
   */
  value: string | number | boolean
  /**
   * 子选项
   */
  children?: CascaderFormItemOption[]
}
