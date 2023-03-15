import type { FormItemUnion } from '@cphayim-enc/base'

export const CHECKBOX_ITEMS: FormItemUnion[] = [
  {
    name: 'checkboxType',
    label: '多选类型',
    type: 'select',
    selectOptions: [
      { label: '单独', value: 'single' },
      { label: '分组', value: 'group' },
    ],
  },
  {
    name: 'checkboxSingleLabel',
    label: '单独文本',
    type: 'input',
  },
  {
    name: 'checkboxSingleTrueValue',
    label: '选中值',
    type: 'input',
  },
  {
    name: 'checkboxSingleFalseValue',
    label: '未选中值',
    type: 'input',
  },
  {
    name: 'checkboxGroupMax',
    label: '分组限制',
    type: 'input',
    inputType: 'number',
  },
]

export const CHECKBOX_OPTION_ITEMS: FormItemUnion[] = [
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
