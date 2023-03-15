import type { FormItemUnion } from '@cphayim-enc/base'

export const RADIO_ITEMS: FormItemUnion[] = []

export const RADIO_OPTION_ITEMS: FormItemUnion[] = [
  {
    name: 'label',
    label: '文本',
    type: 'input',
    col: 8,
  },
  {
    name: 'value',
    label: '值',
    type: 'input',
    col: 8,
  },
  {
    name: 'disabled',
    label: '禁用',
    type: 'checkbox',
    col: 8,
  },
]
