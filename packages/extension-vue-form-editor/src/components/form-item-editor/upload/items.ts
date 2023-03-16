import type { FormItemUnion } from '@cphayim-enc/base'

export const UPLOAD_ITEMS: FormItemUnion[] = [
  {
    name: 'uploadType',
    label: '上传类型',
    type: 'select',
    selectOptions: [
      { label: '图片', value: 'image' },
      { label: '文件', value: 'file' },
    ],
  },
  {
    name: 'uploadTips',
    label: '提示文字',
    type: 'input',
  },
  {
    name: 'uploadButtonText',
    label: '按钮文字',
    type: 'input',
  },
  {
    name: 'uploadMultiple',
    label: '多文件',
    type: 'checkbox',
  },
  {
    name: 'uploadMultipleLimit',
    label: '数量限制',
    type: 'input',
    inputType: 'number',
  },
]
