import type { FormItemUnion } from '@cphayim-enc/base'

export const INPUT_ITEMS: FormItemUnion[] = [
  {
    name: 'inputType',
    label: '输入类型',
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
    name: 'inputRows',
    label: '显示行数',
    type: 'input',
    inputType: 'number',
    hidden: true,
  },
  {
    name: 'inputMaxLength',
    label: '长度限制',
    type: 'input',
    inputType: 'number',
  },
]
