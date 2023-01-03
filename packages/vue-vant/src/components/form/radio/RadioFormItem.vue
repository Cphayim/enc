<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'
import 'vant/es/radio/style/index'
import 'vant/es/radio-group/style/index'

import type { BaseFormItem, RadioFormItem, RadioOptions } from '@cphayim-enc/base'

import { EncInputFormItem } from '../input'

defineOptions({ name: 'EncRadioFormItem' })

const props = defineProps<{
  modelValue: any
  item: RadioFormItem
}>()

const DEFAULT_OPTIONS: Omit<RadioFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  radioOptions: [],
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <EncInputFormItem :modelValue="_value?.toString()" :item="(item as any)" _readonly>
    <template #input>
      <!-- 单选框组 -->
      <van-radio-group
        v-model="_value"
        :disabled="item.disabled || item.readonly"
        direction="horizontal"
      >
        <van-radio
          v-for="(labelOrOption, _) in item.radioOptions"
          :key="_"
          :name="
              (labelOrOption as RadioOptions).value ??
              (labelOrOption as RadioOptions).label ??
              labelOrOption
            "
          :disabled="(labelOrOption as RadioOptions).disabled"
          class="enc-radio"
        >
          {{ (labelOrOption as RadioOptions).label ?? labelOrOption }}
        </van-radio>
      </van-radio-group>
    </template>
  </EncInputFormItem>
</template>

<style>
.enc-radio {
  --van-radio-size: var(--enc-radio-size);
}
</style>
