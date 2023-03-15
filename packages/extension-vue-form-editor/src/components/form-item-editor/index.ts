import type { FormItemUnion } from '@cphayim-enc/base'

import { EncInputFormItemEditor } from './input'
import { EncRadioFormItemEditor } from './radio'
import { EncSelectFormItemEditor } from './select'
import { EncSwitchFormItemEditor } from './switch'

export const typeFormItemEditorComponentMap: Record<FormItemUnion['type'], any> = {
  input: EncInputFormItemEditor,
  select: EncSelectFormItemEditor,
  cascader: null,
  date: null,
  time: null,
  upload: null,
  switch: EncSwitchFormItemEditor,
  radio: EncRadioFormItemEditor,
  checkbox: null,
  custom: null,
}

export * from './base'
export * from './rules'
export * from './input'
