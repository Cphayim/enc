<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
import { useVModel } from '@vueuse/core'
import { Calendar as VanCalendar, type CalendarDayItem } from 'vant'
import 'vant/es/calendar/style/index'

import type { BaseFormItem, DateFormItem } from '@cphayim-enc/base'
import { useEventLock } from '@cphayim-enc/vue'

import { EncInputFormItem } from '../input'

defineOptions({ name: 'EncDateFormItem' })

const props = defineProps<{
  modelValue: any
  item: DateFormItem
}>()

const DEFAULT_OPTIONS: Omit<DateFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  dateType: 'date',
  dateFormat: 'YYYY-MM-DD',
  dateRangeSeparator: '-',
  dateMinDate: dayjs().subtract(10, 'year').toDate(),
  dateMaxDate: dayjs().add(10, 'year').toDate(),
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// 显示在输入框上的日期格式，默认同 dateFormat
const dateDisplayFormat = computed(() => item.value.dateDisplayFormat ?? item.value.dateFormat)

// vant calendar 组件的 min-date 和 max-date 属性只支持 Date 类型
const minDate = computed(() =>
  typeof item.value.dateMinDate === 'string'
    ? dayjs(item.value.dateMinDate).toDate()
    : item.value.dateMinDate,
)
const maxDate = computed(() =>
  typeof item.value.dateMaxDate === 'string'
    ? dayjs(item.value.dateMaxDate).toDate()
    : item.value.dateMaxDate,
)

/**
 * 当 dateType 非 'daterange' 时，value 为单个值，否则为数组
 */
const _value = useVModel(props, 'modelValue')

const _dateValue = ref<Date | Date[]>()
watchEffect(() => {
  if (!_value.value) {
    _dateValue.value = undefined
  } else if (item.value.dateType === 'daterange') {
    // ['2000-01-01', '2000-01-02'] -> [Date, Date]
    _dateValue.value = _value.value.map((v: string) => dayjs(v).toDate())
  } else {
    // '2000-01-01' -> Date
    _dateValue.value = dayjs(_value.value).toDate()
  }
})

const _displayValue = computed(() => {
  if (!_value.value) return undefined
  else if (item.value.dateType === 'daterange') {
    // ['2000-01-01', '2000-01-02'] -> '2000-01-01 - 2000-01-02'
    return _value.value
      .map((item: string) => dayjs(item).format(dateDisplayFormat.value))
      .join(` ${item.value.dateRangeSeparator} `)
  } else {
    // '2000-01-01' -> '2000-01-01'
    return dayjs(_value.value).format(dateDisplayFormat.value)
  }
})

const handleConfirm = useEventLock((value: any) => {
  // 设置为 dateFormat 格式
  if (item.value.dateType === 'daterange') {
    // [Date, Date] -> ['2000-01-01', '2000-01-02']
    _value.value = value.map((v: Date) => dayjs(v).format(item.value.dateFormat))
  } else {
    // Date -> '2000-01-01'
    _value.value = dayjs(value).format(item.value.dateFormat)
  }
  showPopup.value = false
})

// vant 的 formatter 处理函数
const handleFormatter = (day: CalendarDayItem): CalendarDayItem => {
  return day
}

const showPopup = ref(false)
</script>

<template>
  <EncInputFormItem
    :modelValue="_displayValue"
    :item="(item as any)"
    @click="() => (showPopup = true)"
    _readonly
    _is-link
  >
  </EncInputFormItem>

  <van-calendar
    v-model:show="showPopup"
    :title="item.label"
    :default-date="_dateValue"
    :min-date="minDate"
    :max-date="maxDate"
    :type="item.dateType === 'daterange' ? 'range' : 'single'"
    :formatter="handleFormatter"
    @confirm="handleConfirm"
    :close-on-click-overlay="item.closeOnClickOverlay"
    :allow-same-day="false"
    safe-area-inset-bottom
  />
</template>

<style scoped></style>
