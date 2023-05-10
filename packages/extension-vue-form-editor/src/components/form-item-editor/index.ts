import type { FormItemUnion } from '@cphayim-enc/base'

import { EncCheckboxFormItemEditor } from './checkbox'
import { EncDateFormItemEditor } from './date'
import { EncInputFormItemEditor } from './input'
import { EncRadioFormItemEditor } from './radio'
import { EncRateFormItemEditor } from './rate'
import { EncSelectFormItemEditor } from './select'
import { EncSwitchFormItemEditor } from './switch'
import { EncTimeFormItemEditor } from './time'
import { EncUploadFormItemEditor } from './upload'

// formItem.type -> FormItemEditor 的映射关系
export const typeFormItemEditorComponentMap: Record<FormItemUnion['type'], any> = {
  input: EncInputFormItemEditor,
  select: EncSelectFormItemEditor,
  cascader: null,
  date: EncDateFormItemEditor,
  time: EncTimeFormItemEditor,
  upload: EncUploadFormItemEditor,
  switch: EncSwitchFormItemEditor,
  radio: EncRadioFormItemEditor,
  checkbox: EncCheckboxFormItemEditor,
  rate: EncRateFormItemEditor,
  custom: null,
}

export * from './base'
export * from './rules'
export * from './input'
