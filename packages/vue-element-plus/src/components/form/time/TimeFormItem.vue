<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

import { ElTimePicker } from 'element-plus'
import 'element-plus/es/components/time-picker/style/css'

import type { BaseFormItem, TimeFormItem, TimeFormItemType } from '@cphayim-enc/base'

defineOptions({ name: 'EncTimeFormItem' })

const props = defineProps<{
  modelValue: any
  item: TimeFormItem
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: any): void }>()

const TIME_TYPE_FORMAT_MAP: Record<TimeFormItemType, string> = {
  'hour-minute': 'HH:mm',
  'hour-minute-second': 'HH:mm:ss',
}

const DEFAULT_OPTIONS: Omit<TimeFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  timeType: 'hour-minute',
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// 仅时间值需要适配，element-plus 接收的仍然是含有 Date 的日期
// 而我们输入或输出的是仅时间的字符串 “12:00”
const _value = computed({
  get() {
    if (!props.modelValue) return undefined
    // props.modelValue: "12:00"
    // 转成 date 对象给 time-picker
    return dayjs(props.modelValue).isValid()
      ? dayjs(props.modelValue).toDate()
      : dayjs(`${dayjs().format('YYYY-MM-DD')} ${props.modelValue}`).toDate()
  },
  set(date: Date | undefined) {
    if (!date) {
      emit('update:modelValue', undefined)
    } else {
      // time 的格式化固定为格式
      emit('update:modelValue', dayjs(date).format(TIME_TYPE_FORMAT_MAP[item.value.timeType!]))
    }
  },
})
</script>

<template>
  <el-time-picker
    v-model="_value"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :placeholder="item.placeholder"
    :clearable="item.clearable"
    :format="TIME_TYPE_FORMAT_MAP[item.timeType!]"
  />
</template>

<style></style>
