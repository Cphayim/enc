<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed } from 'vue'

import type { BaseFormItem, DateFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncDateFormItem' })

const props = defineProps<{
  modelValue: any
  item: DateFormItem
}>()

const DEFAULT_OPTIONS: Omit<DateFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  dateType: 'date',
  dateFormat: 'YYYY-MM-DD',
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// 显示在输入框上的日期格式，默认同 dateFormat
const dateDisplayFormat = computed(() => item.value.dateDisplayFormat ?? item.value.dateFormat)

const _value = useVModel(props, 'modelValue')

const dateMinDate = computed(() =>
  typeof item.value.dateMinDate === 'string'
    ? new Date(item.value.dateMinDate)
    : item.value.dateMinDate,
)
const dateMaxDate = computed(() =>
  typeof item.value.dateMaxDate === 'string'
    ? new Date(item.value.dateMaxDate)
    : item.value.dateMaxDate,
)

const handleDisableDate = (date: Date) => {
  if (dateMinDate.value && dayjs(date).isBefore(dayjs(dateMinDate.value), 'date')) return true
  if (dateMaxDate.value && dayjs(date).isAfter(dayjs(dateMaxDate.value), 'date')) return true
  return false
}
</script>

<template>
  <el-date-picker
    :type="item.dateType"
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
