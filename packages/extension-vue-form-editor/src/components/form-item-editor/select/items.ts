import type { FormItemUnion } from '@cphayim-enc/base'

export const SELECT_ITEMS: FormItemUnion[] = [
  {
    name: 'selectMultiple',
    label: '是否多选',
    type: 'checkbox',
    col: 12,
  },
  {
    name: 'selectFilterable',
    label: '条件过滤',
    type: 'checkbox',
    col: 12,
  },
  {
    name: 'selectMultipleLimit',
    label: '多选数量',
    type: 'input',
    inputType: 'number',
    hidden: true,
  },
]

export const SELECT_OPTION_ITEMS: FormItemUnion[] = [
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
