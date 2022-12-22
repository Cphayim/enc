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
    type: 'select',
    col: 12,
    selectType: 'cascader',
    selectOptions: [
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
    selectMultiple: true,
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
]

const formItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, DEFAULT_FORM_ITEMS)
console.log(formItems.value)
</script>

<template>
  <div></div>
</template>
