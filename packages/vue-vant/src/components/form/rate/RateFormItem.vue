<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { Rate as VanRate } from 'vant'
import 'vant/es/rate/style/index'

import type { BaseFormItem, RateFormItem } from '@cphayim-enc/base'

import { EncInputFormItem } from '../input'

defineOptions({ name: 'EncRateFormItem' })

const props = defineProps<{
  modelValue: any
  item: RateFormItem
}>()

const DEFAULT_OPTIONS: Omit<RateFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '未评分',
  rateMax: 5,
  rateAllowHalf: false,
  rateColor: '#F7BA2A',
  rateVoidColor: '#C6D1DE',
  rateShowText: false,
  rateTextFormatter: (score) => `${score} 分`,
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')

const currentText = computed(() => {
  if (!_value.value) return
  return item.value.rateTexts?.[_value.value - 1] || item.value.rateTextFormatter!(_value.value)
})
</script>

<template>
  <div class="enc-rate">
    <EncInputFormItem :modelValue="currentText" :item="(item as any)" _readonly />
    <div class="enc-rate-content">
      <van-rate
        v-model="_value"
        :count="item.rateMax"
        :color="item.rateColor"
        :void-color="item.rateVoidColor"
      />
    </div>
  </div>
</template>

<style>
.enc-rate {
  .van-cell {
    &::after {
      @apply enc-hidden;
    }
  }
}
.enc-rate-content {
  @apply enc-px-[16px] enc-pb-[10px];
}
</style>
