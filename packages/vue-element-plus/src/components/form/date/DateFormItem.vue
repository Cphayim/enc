<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import dayjs from 'dayjs'

import { ElDatePicker } from 'element-plus'
import 'element-plus/es/components/date-picker/style/css'

import type { BaseFormItem, DateFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncDateFormItem' })

const props = defineProps<{
  modelValue?: any
  item: DateFormItem
}>()

const DEFAULT_OPTIONS: Omit<DateFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  dateType: 'date',
  dateFormat: 'YYYY-MM-DD',
  dateMinDate: dayjs().subtract(10, 'year').toDate(),
  dateMaxDate: dayjs().add(10, 'year').toDate(),
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// 显示在输入框上的日期格式，默认同 dateFormat
const dateDisplayFormat = computed(() => item.value.dateDisplayFormat ?? item.value.dateFormat)

const _value = useVModel(props, 'modelValue')

const dateMinDate = computed(() =>
  item.value.dateMinDate instanceof Date
    ? item.value.dateMinDate
    : dayjs(item.value.dateMinDate, item.value.dateFormat).toDate(),
)
const dateMaxDate = computed(() =>
  item.value.dateMaxDate instanceof Date
    ? item.value.dateMaxDate
    : dayjs(item.value.dateMaxDate, item.value.dateFormat).toDate(),
)

const handleDisableDate = (date: Date) => {
  if (dateMinDate.value && dayjs(date).isBefore(dayjs(dateMinDate.value), 'date')) return true
  if (dateMaxDate.value && dayjs(date).isAfter(dayjs(dateMaxDate.value), 'date')) return true
  return false
}
</script>

<template>
  <el-date-picker
    :type="(item.dateType as any)"
    v-model="_value"
    :value-format="item.dateFormat"
    :format="dateDisplayFormat"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :placeholder="item.placeholder"
    :range-separator="item.dateRangeSeparator"
    :start-placeholder="item.dateRangeStartPlaceholder"
    :end-placeholder="item.dateRangeEndPlaceholder"
    :disabled-date="handleDisableDate"
  />
</template>

<style></style>
