<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

import {
  createStringUploadTransformer,
  defaultUploadTransformer,
  FormItemUnion,
} from '@cphayim-enc/base'

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
    name: 'colors',
    label: '颜色',
    type: 'select',
    col: 12,
    selectMultiple: true,
    selectOptions: [
      { label: '蓝色', value: 'blue' },
      { label: '红色', value: 'red', disabled: true },
      { label: '绿色', value: 'green' },
      { label: '黄色', value: 'yellow' },
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
          { label: '1F', value: '1' },
          { label: '2F', value: '2' },
          { label: '3F', value: '3' },
        ],
      },
      {
        label: 'B栋',
        value: 'B',
        children: [
          { label: 'B1F', value: '4' },
          { label: '1F', value: '5' },
        ],
      },
    ],
    cascaderEmitPath: true,
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
    type: 'date',
    col: 12,
  },
  {
    name: 'contractDateRange',
    label: '合同周期',
    type: 'date',
    dateType: 'daterange',
    dateRangeSeparator: '至',
    dateRangeStartPlaceholder: '开始日期',
    dateRangeEndPlaceholder: '结束日期',
    dateMinDate: '2022-12-01',
    dateMaxDate: '2022-12-07',
  },
  {
    label: '照片',
    type: 'upload',
    name: 'photos',
    uploadType: 'image',
    uploadTips: '只能上传 3 张图片\n图片文件大小不能超过 300kb',
  },
  {
    label: '文件',
    type: 'upload',
    name: 'file',
    uploadMultipleLimit: 1,
    uploadType: 'file',
    uploadTips: '只能上传 1 个文件',
  },
  {
    label: '启用日志',
    type: 'checkbox',
    name: 'log',
    col: 12,
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
    label: '车辆类型',
    type: 'radio',
    name: 'carModel',
    col: 12,
    radioOptions: ['轿车', 'SUV', { label: '大货车', value: '货车' }],
  },
  {
    label: '开关',
    type: 'switch',
    name: 'switch',
    col: 12,
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
