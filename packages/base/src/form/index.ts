import type { CascaderFormItem } from './CascaderFormItem'
import type { CheckboxFormItem } from './CheckboxFormItem'
import type { CustomFormItem } from './CustomFormItem'
import type { DateFormItem } from './DateFormItem'
import type { InputFormItem } from './InputFormItem'
import type { RadioFormItem } from './RadioFormItem'
import type { SelectFormItem } from './SelectFormItem'
import type { SwitchFormItem } from './SwitchFormItem'
import type { TimeFormItem } from './TimeFormItem'
import type { UploadFormItem } from './UploadFormItem'

export type FormItemUnion<F = string, E = any> =
  | InputFormItem<F, E>
  | SelectFormItem<F, E>
  | CascaderFormItem<F, E>
  | DateFormItem<F, E>
  | TimeFormItem<F, E>
  | UploadFormItem<F, E>
  | SwitchFormItem<F, E>
  | RadioFormItem<F, E>
  | CheckboxFormItem<F, E>
  | CustomFormItem<F, E>

// Used for default configuration
export type OmitTypeFormItem<F = string, E = any> = Partial<
  Omit<InputFormItem<F, E>, 'type'> &
    Omit<SelectFormItem<F, E>, 'type'> &
    Omit<CascaderFormItem<F, E>, 'type'> &
    Omit<DateFormItem<F, E>, 'type'> &
    Omit<TimeFormItem<F, E>, 'type'> &
    Omit<UploadFormItem<F, E>, 'type'> &
    Omit<SwitchFormItem<F, E>, 'type'> &
    Omit<RadioFormItem<F, E>, 'type'> &
    Omit<CheckboxFormItem<F, E>, 'type'> &
    Omit<CustomFormItem<F, E>, 'type'>
>

export type FormProps = {
  /**
   * 表单数据键值
   */
  data: Record<string, any>
  /**
   * 表单项数组
   */
  items: FormItemUnion[]
}

export * from './BaseFormItem'
export * from './InputFormItem'
export * from './PopupFormItem'
export * from './SelectFormItem'
export * from './CascaderFormItem'
export * from './DateFormItem'
export * from './TimeFormItem'
export * from './UploadFormItem'
export * from './SwitchFormItem'
export * from './RadioFormItem'
export * from './CheckboxFormItem'
export * from './CustomFormItem'
