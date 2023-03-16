import type { FormItemUnion } from '@cphayim-enc/base'

export const DATE_ITEMS: FormItemUnion[] = [
  {
    name: 'dateFormat',
    label: '日期格式',
    type: 'input',
  },
  {
    name: 'dateMinDate',
    label: '最小日期',
    type: 'date',
    dateType: 'date',
  },
  {
    name: 'dateMaxDate',
    label: '最大日期',
    type: 'date',
    dateType: 'date',
  },
]
