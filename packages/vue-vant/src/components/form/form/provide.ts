export type FormInternalConfig = {
  /**
   * 左侧标题宽度
   * @default '6.2em'
   */
  labelWidth?: number | string
  /**
   * 标签的位置
   * @default 'left'
   */
  labelPosition?: 'left' | 'right' | 'top'
}

export const DEFAULT_FORM_INTERNAL_CONFIG: FormInternalConfig = {
  labelWidth: '6.2em',
  labelPosition: 'left',
}

export const FORM_INTERNAL_CONFIG_KEY = Symbol('FORM_INTERNAL_CONFIG_KEY')
