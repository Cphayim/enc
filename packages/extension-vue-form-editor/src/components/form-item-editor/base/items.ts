import type { FormItemUnion } from '@cphayim-enc/base'

export const BASE_ITEMS: FormItemUnion[] = [
  {
    name: 'name',
    label: '字段名',
    type: 'input',
    placeholder: '表单字段名',
    rules: [{ required: true, message: '必填项' }],
  },
  {
    name: 'label',
    label: '标签名',
    type: 'input',
    placeholder: '表单标签名，显示用',
    rules: [{ required: true, message: '必填项' }],
  },
  {
    name: 'placeholder',
    label: '占位符',
    type: 'input',
    placeholder: '例："请输入 XXX"',
  },
  {
    name: 'col',
    label: '列宽度',
    type: 'select',
    selectOptions: [
      { label: '25%', value: 6 },
      { label: '50%', value: 12 },
      { label: '100%', value: 24 },
    ],
  },
  {
    name: 'hidden',
    label: '隐藏',
    type: 'checkbox',
    col: 8,
  },
  {
    name: 'readonly',
    label: '只读',
    type: 'checkbox',
    col: 8,
  },
  {
    name: 'disabled',
    label: '禁用',
    type: 'checkbox',
    col: 8,
  },
]
