<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'
import type { TimePickerColumnType } from 'vant'

import type { BaseFormItem, TimeFormItem } from '@cphayim-enc/base'
// import { isNone } from '@cphayim-enc/shared'
import { useEventLock } from '@cphayim-enc/vue'

import EncInputFormItem from './InputFormItem.vue'
import EncPopupFormItem from './PopupFormItem.vue'

defineOptions({ name: 'EncTimeFormItem' })

const props = defineProps<{
  modelValue: any
  item: TimeFormItem
}>()

const TIME_SEPARATOR = ':'
const DEFAULT_OPTIONS: Omit<TimeFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  timeType: 'hour-minute',
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))
const columnsType = computed<TimePickerColumnType[]>(() =>
  item.value.timeType === 'hour-minute' ? ['hour', 'minute'] : ['hour', 'minute', 'second'],
)

/**
 * 格式化之后的值 HH:mm 或 HH:mm:ss
 */
const _value = useVModel(props, 'modelValue')

// vant 接收和返回的时间数据是数组
const _timeValue = ref<string[]>()
watchEffect(() => {
  if (!_value.value) {
    _timeValue.value = undefined
  } else {
    _timeValue.value = _value.value.split(TIME_SEPARATOR)
  }
})

const showPopup = ref(false)

const handleConfirm = useEventLock(({ selectedValues }: any) => {
  _value.value = selectedValues.join(TIME_SEPARATOR)
  showPopup.value = false
})
</script>

<template>
  <EncInputFormItem
    :modelValue="_value"
    :item="(item as any)"
    @click="() => (showPopup = true)"
    _readonly
    _is-link
  >
  </EncInputFormItem>

  <EncPopupFormItem v-model:show="showPopup" :item="item">
    <template #default="{ showToolbar }">
      <van-time-picker
        v-model="_timeValue"
        :title="item.label"
        :columns-type="columnsType"
        :show-toolbar="showToolbar"
        @confirm="handleConfirm"
        @cancel="() => (showPopup = false)"
      />
    </template>
  </EncPopupFormItem>
</template>

<style scoped></style>
