<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

import type { FormItemUnion } from '@cphayim-enc/base'

import { FORM_ITEMS_STORE_KEY } from '../../constants'

const DEFAULT_FORM_ITEMS: FormItemUnion[] = [
  {
    name: 'name',
    label: '用户名',
    type: 'input',
    col: 12,
    // scale: 0.5,
    rules: [
      { required: true, message: '请输入姓名' },
      { pattern: '^[^\\d+]$', message: '不能包含数字' },
    ],
    // inputType: 'text',
  },
  {
    name: 'password',
    label: '密码',
    type: 'input',
    inputType: 'password',
    col: 12,
  },
  {
    name: 'intro',
    label: '介绍',
    type: 'input',
    inputType: 'textarea',
    col: 24,
  },
  {
    name: 'gender',
    label: '性别',
    type: 'select',
    col: 12,
    selectOptions: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    name: 'building',
    label: '楼栋',
    type: 'cascader',
    col: 12,
    cascaderOptions: [
      {
        label: 'A栋',
        value: 'A',
        children: [
          { label: '1F', value: '1F' },
          { label: '2F', value: '2F' },
          { label: '3F', value: '3F' },
        ],
      },
      {
        label: 'B栋',
        value: 'B',
        children: [
          { label: 'B1F', value: 'B1F' },
          { label: '1F', value: '1F' },
        ],
      },
    ],
    cascaderMultiple: true,
  },
  {
    name: 'alarm',
    label: '闹钟',
    type: 'time',
    col: 12,
  },
  {
    name: 'birthday',
    label: '生日',
    type: 'datetime',
    col: 12,
  },
  {
    name: 'contractDateRange',
    label: '合同周期',
    type: 'datetime',
    datetimeType: 'daterange',
    datetimeRangeSeparator: '至',
    datetimeRangeStartPlaceholder: '开始日期',
    datetimeRangeEndPlaceholder: '结束日期',
    datetimeMinDate: '2022-12-01',
    datetimeMaxDate: '2022-12-07',
  },
  {
    label: '照片',
    type: 'upload',
    name: 'photos',
    uploadType: 'image',
    uploadLimit: 3,
    uploadTips: '只能上传 3 张图片\n图片文件大小不能超过 300kb',
  },
  {
    label: '文件',
    type: 'upload',
    name: 'file',
    uploadLimit: 1,
    uploadType: 'file',
    uploadTips: '只能上传 1 个文件',
  },
  {
    label: '启用日志',
    type: 'checkbox',
    name: 'log',
    col: 12,
    checkboxSingleLabel: '启用',
  },
  {
    label: '灯光组',
    type: 'checkbox',
    name: 'light',
    col: 12,
    checkboxType: 'group',
    checkboxGroupOptions: ['白光', '红光', { label: '蓝光', value: 'blue', disabled: true }],
  },
  {
    label: '开关',
    type: 'switch',
    name: 'switch',
    switchActiveValue: 'on',
    switchInactiveValue: 'off',
  },
]

const formItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, DEFAULT_FORM_ITEMS)
formItems.value = DEFAULT_FORM_ITEMS
</script>

<template>
  <div></div>
</template>
