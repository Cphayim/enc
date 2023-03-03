import type { FormItemUnion } from '@cphayim-enc/base'

export const INPUT_ITEMS: FormItemUnion[] = [
  {
    name: 'inputType',
    label: '类型',
    type: 'select',
    selectOptions: [
      { label: '单行输入', value: 'text' },
      { label: '多行输入', value: 'textarea' },
      { label: '数字输入', value: 'number' },
      { label: '密码输入', value: 'password' },
    ],
    rules: [{ required: true, message: '必填项' }],
  },
  {
    name: 'inputMaxLength',
    label: '最大长度',
    type: 'input',
    inputType: 'number',
  },
  {
    name: 'inputRows',
    label: '行数',
    type: 'input',
    inputType: 'number',
    hidden: true,
  },
]
