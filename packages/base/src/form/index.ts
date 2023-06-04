import type { PickInUnion, TupleOmit, TupleToUnion, UnionToIntersection } from '@cphayim-enc/shared'

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

type FormItemTuple<F = string, E = any> = [
  CascaderFormItem<F, E>,
  CheckboxFormItem<F, E>,
  CustomFormItem<F, E>,
  DateFormItem<F, E>,
  InputFormItem<F, E>,
  RadioFormItem<F, E>,
  RateFormItem<F, E>,
  SelectFormItem<F, E>,
  SwitchFormItem<F, E>,
  TimeFormItem<F, E>,
  UploadFormItem<F, E>,
]

/**
 * 所有 `FormItem` 的联合类型，根据 `type` 进行类型收窄
 */
export type FormItemUnion<F = string, E = any> = TupleToUnion<FormItemTuple<F, E>>

type FormItemUnionWithoutType<F = string, E = any> = TupleToUnion<
  TupleOmit<FormItemTuple<F, E>, 'type'>
>

/**
 * 包含所有 FormItem 可选属性的类型
 * - 取 `FormItemUnion` 中所有 `FormItem` 的 `type` 的类型组成的联合类型
 * - 取 `FormItemUnionWithoutType` 中所有 `FormItem 做交叉类型
 */
export type PartialFormItemIntersection<F = string, E = any> = Partial<
  PickInUnion<FormItemUnion<F, E>, 'type'> & UnionToIntersection<FormItemUnionWithoutType>
>

/**
 * 不包含 `name` 和 `type` 的 `PartialFormItemIntersection`
 */
export type PartialFormItemIntersectionWithoutNameAndType<F = string, E = any> = Omit<
  PartialFormItemIntersection<F, E>,
  'name' | 'type'
>

export * from './base'
export * from './cascader'
export * from './checkbox'
export * from './custom'
export * from './date'
export * from './input'
export * from './popup'
export * from './radio'
export * from './rate'
export * from './select'
export * from './switch'
export * from './time'
export * from './upload'
