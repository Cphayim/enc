<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { ElRate } from 'element-plus'
import 'element-plus/es/components/rate/style/css'

import type { BaseFormItem, RateFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncRateFormItem' })

const props = defineProps<{
  modelValue?: any
  item: BaseFormItem
}>()

const DEFAULT_OPTIONS: Omit<RateFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  rateMax: 5,
  rateAllowHalf: false,
  rateColor: '#F7BA2A',
  rateVoidColor: '#C6D1DE',
  rateShowText: false,
  rateTextFormatter: (score) => `${score} 分`,
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')

const colors = computed<string[]>(() => new Array(item.value.rateMax).fill(item.value.rateColor))

const currentText = computed(() => {
  if (!_value.value) return
  return item.value.rateTexts?.[_value.value - 1] || item.value.rateTextFormatter!(_value.value)
})
const rateMax = computed(() => (item.value.rateMax ? Math.abs(~~item.value.rateMax) : undefined))
</script>

<template>
  <el-rate
    v-model="_value"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :max="rateMax"
    :allow-half="item.rateAllowHalf"
    :colors="colors"
    :void-color="item.rateVoidColor"
  />
  <span v-if="item.rateShowText" class="enc-ml-[5px] enc-text-gray-600 enc-text-[14px]">
    {{ currentText }}
  </span>
</template>

<style></style>
