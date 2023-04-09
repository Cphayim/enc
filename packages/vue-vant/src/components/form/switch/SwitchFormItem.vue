<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { Switch as VanSwitch } from 'vant'
import 'vant/es/switch/style/index'

import type { BaseFormItem, SwitchFormItem } from '@cphayim-enc/base'

import { EncInputFormItem } from '../input'

defineOptions({ name: 'EncSwitchFormItem' })

const props = defineProps<{
  modelValue: any
  item: SwitchFormItem
}>()

const DEFAULT_OPTIONS: Omit<SwitchFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  switchActiveValue: true,
  switchInactiveValue: false,
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <EncInputFormItem :modelValue="_value?.toString()" :item="(item as any)" _readonly>
    <template #input>
      <van-switch
        v-model="_value"
        :active-value="item.switchActiveValue"
        :inactive-value="item.switchInactiveValue"
        :disabled="item.disabled || item.readonly"
        class="enc-switch"
      />
    </template>
  </EncInputFormItem>
</template>

<style>
.enc-switch {
  font-size: var(--enc-vant-switch-size);
}
</style>
