import type { FormItemUnion } from '@cphayim-enc/base'

export const SWITCH_ITEMS: FormItemUnion[] = [
  {
    name: 'switchActiveValue',
    label: '开启值',
    type: 'input',
    col: 12,
  },
  {
    name: 'switchInactiveValue',
    label: '关闭值',
    type: 'input',
    col: 12,
  },
  {
    name: 'switchActiveText',
    label: '开启文本',
    type: 'input',
    col: 12,
  },
  {
    name: 'switchInactiveText',
    label: '关闭文本',
    type: 'input',
    col: 12,
  },
]
