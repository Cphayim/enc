import type { CascaderFormItem } from './cascader'
import type { CheckboxFormItem } from './checkbox'
import type { CustomFormItem } from './custom'
import type { DateFormItem } from './date'
import type { InputFormItem } from './input'
import type { RadioFormItem } from './radio'
import type { RateFormItem } from './rate'

import type { SelectFormItem } from './select'
import type { SwitchFormItem } from './switch'
import type { TimeFormItem } from './time'
import type { UploadFormItem } from './upload'

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
  | RateFormItem<F, E>
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
    Omit<RateFormItem, 'type' | 'name'> &
    Omit<CustomFormItem, 'type' | 'name'>
>

export * from './base'
export * from './input'
export * from './popup'
export * from './select'
export * from './cascader'
export * from './date'
export * from './time'
export * from './upload'
export * from './switch'
export * from './radio'
export * from './checkbox'
export * from './rate'
export * from './custom'
