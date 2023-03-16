import type { FormItemUnion } from '@cphayim-enc/base'

export const TIME_ITEMS: FormItemUnion[] = [
  {
    name: 'timeType',
    label: '时间类型',
    type: 'select',
    selectOptions: [
      { label: '时:分', value: 'hour-minute' },
      { label: '时:分:秒', value: 'hour-minute-second' },
    ],
  },
]
