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
export type OmitPartialFormItem = Partial<
  Omit<InputFormItem, 'type' | 'name'> &
    Omit<SelectFormItem, 'type' | 'name'> &
    Omit<CascaderFormItem, 'type' | 'name'> &
    Omit<DateFormItem, 'type' | 'name'> &
    Omit<TimeFormItem, 'type' | 'name'> &
    Omit<UploadFormItem, 'type' | 'name'> &
    Omit<SwitchFormItem, 'type' | 'name'> &
    Omit<RadioFormItem, 'type' | 'name'> &
    Omit<CheckboxFormItem, 'type' | 'name'> &
    Omit<CustomFormItem, 'type' | 'name'>
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
