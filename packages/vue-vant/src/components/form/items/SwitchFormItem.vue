<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { BaseFormItem, SwitchFormItem } from '@cphayim-enc/base'
// import { isNone } from '@cphayim-enc/shared'
// import { useEventLock } from '@cphayim-enc/vue'

import EncInputFormItem from './InputFormItem.vue'

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
  font-size: var(--enc-switch-size);
}
</style>
