import type { FormItemUnion } from '@cphayim-enc/base'

import { EncInputFormItemEditor } from './input'
import { EncSelectFormItemEditor } from './select'

export const typeFormItemEditorComponentMap: Record<FormItemUnion['type'], any> = {
  input: EncInputFormItemEditor,
  select: EncSelectFormItemEditor,
  cascader: null,
  date: null,
  time: null,
  upload: null,
  switch: null,
  radio: null,
  checkbox: null,
  custom: null,
}

export * from './base'
export * from './rules'
export * from './input'
