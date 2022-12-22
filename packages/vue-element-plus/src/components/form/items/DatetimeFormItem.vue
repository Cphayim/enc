<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed } from 'vue'

import type { BaseFormItem, DatetimeFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncDatetimeFormItem' })

const props = defineProps<{
  modelValue: any
  item: DatetimeFormItem
}>()

const DEFAULT_OPTIONS: Omit<DatetimeFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  datetimeType: 'date',
  datetimeFormat: 'YYYY-MM-DD',
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// 显示在输入框上的日期格式，默认同 datetimeFormat
const datetimeDisplayFormat = computed(
  () => item.value.datetimeDisplayFormat ?? item.value.datetimeFormat,
)

const _value = useVModel(props, 'modelValue')

const datetimeMinDate = computed(() =>
  typeof item.value.datetimeMinDate === 'string'
    ? new Date(item.value.datetimeMinDate)
    : item.value.datetimeMinDate,
)
const datetimeMaxDate = computed(() =>
  typeof item.value.datetimeMaxDate === 'string'
    ? new Date(item.value.datetimeMaxDate)
    : item.value.datetimeMaxDate,
)

const handleDisableDate = (date: Date) => {
  if (datetimeMinDate.value && dayjs(date).isBefore(dayjs(datetimeMinDate.value), 'date'))
    return true
  if (datetimeMaxDate.value && dayjs(date).isAfter(dayjs(datetimeMaxDate.value), 'date'))
    return true
  return false
}
</script>

<template>
  <el-date-picker
    :type="item.datetimeType"
    v-model="_value"
    :value-format="item.datetimeFormat"
    :format="datetimeDisplayFormat"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :placeholder="item.placeholder"
    :range-separator="item.datetimeRangeSeparator"
    :start-placeholder="item.datetimeRangeStartPlaceholder"
    :end-placeholder="item.datetimeRangeEndPlaceholder"
    :disabled-date="handleDisableDate"
  />
</template>

<style></style>
