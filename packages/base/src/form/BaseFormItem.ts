/**
 * 基本表单项类型
 */
export interface BaseFormItem<F = string, E = any> {
  /**
   * 控件类型（由 SubFormItem 定义类型收窄）
   */
  type: string
  /**
   * 标签名
   */
  label: string
  /**
   * 字段名
   */
  name: F
  /**
   * 占位
   */
  placeholder?: string
  /**
   * 是否隐藏当前项
   * @default false
   */
  hidden?: boolean
  /**
   * 只读
   * @default false
   */
  readonly?: boolean
  /**
   * 禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 验证规则
   * @default []
   */
  rules?: FormItemRule[]
  /**
   * 额外内容，你可以在此存储一些特定业务场景的东西，比如 select 对应的枚举或字典值，上传地址等
   *
   * 组件不负责处理该内容，使用前自行转化为有效的组件 props
   */
  extra?: E
  /**
   * 控件对齐方式（例如 input 内文字，部分控件有效）
   * @default 'left'
   */
  align?: FormItemAlign
  /**
   * label 标签对齐方式
   *
   * 默认值：由 UI package 决定，通常 PC 端为 'right'，移动端为 'left'
   */
  labelAlign?: FormItemAlign
}

/**
 * 校验规则
 */
export type FormItemRule = {
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 正则表达式或正则表达式字符串
   *
   * 注意，如果传递的是字符串
   * /\d+/ 对应为 '\\d+'
   */
  pattern?: RegExp | string
  /**
   * 验证失败的错误消息
   */
  message?: string
}

/**
 * 对齐方式（用于 label 和 控件本身）
 */
export type FormItemAlign = 'left' | 'center' | 'right'
