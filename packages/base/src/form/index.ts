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

/**
 * 所有 `FormItem` 的联合类型，根据 `type` 进行类型收窄
 */
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

type PickInUnion<T, F extends string> = Pick<Extract<T, { [K in F]: any }>, F>
type OmitInUnionToInsertion<T, F extends string> = Extract<T, { [k in F]: any }> extends infer U
  ? { [K in keyof U]: Omit<U, F> }[keyof U]
  : never

/**
 * 包含所有 FormItem 可选属性的类型
 * - 取 `FormItemUnion` 中所有 `FormItem` 的 `type` 的类型做联合类型
 * - 取 `FormItemUnion` 中所有 `FormItem` 移除 `type` 后做交叉类型（`type` 不相交）
 */
export type PartialFormItemUnion<F = string, E = any> = Partial<
  PickInUnion<FormItemUnion<F, E>, 'type'> & OmitInUnionToInsertion<FormItemUnion<F, E>, 'type'>
>

/**
 * 不含有 `name` 和 `type` 的 `PartialFormItemUnion`
 */
export type PartialFormItemUnionWithoutNameAndType<F = string, E = any> = Omit<
  PartialFormItemUnion<F, E>,
  'name' | 'type'
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
