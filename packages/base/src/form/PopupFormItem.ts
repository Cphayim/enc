import type { BaseFormItem } from './BaseFormItem'

/**
 * 弹出层表单项类型
 *
 * 定义一些弹框配置项，这些配置项通常仅在移动端有效
 *
 * 所有移动端带弹层的表单项都应该继承该类型
 */
export interface PopupFormItem<F = string, E = any> extends BaseFormItem<F, E> {
  /**
   * 是否在点击遮罩层后关闭
   * @default true
   */
  closeOnClickOverlay?: boolean
  /**
   * 显示顶部栏
   * @default true
   */
  showToolbar?: boolean
  /**
   * 弹出层高度
   * @default 'auto'
   */
  popupHeight?: string | number
}
