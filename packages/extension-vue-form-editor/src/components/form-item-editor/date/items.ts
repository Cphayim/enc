import type { FormItemUnion } from '@cphayim-enc/base'

export const DATE_ITEMS: FormItemUnion[] = [
  {
    name: 'dateType',
    label: '日期类型',
    type: 'select',
    selectOptions: [
      { label: '日期', value: 'date' },
      { label: '日期范围', value: 'daterange' },
    ],
  },
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
  {
    name: 'dateRangeSeparator',
    label: '分隔符',
    type: 'input',
  },
  {
    name: 'dateRangeStartPlaceholder',
    label: '开始占位',
    type: 'input',
  },
  {
    name: 'dateRangeEndPlaceholder',
    label: '结束占位',
    type: 'input',
  },
]
