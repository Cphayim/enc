<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { BaseFormItem, SwitchFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncSwitchFormItem' })

const props = defineProps<{
  modelValue: any
  item: SwitchFormItem
}>()

const DEFAULT_OPTIONS: Omit<SwitchFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请输入',
  switchActiveValue: true,
  switchInactiveValue: false,
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <el-switch
    v-model="_value"
    :active-value="item.switchActiveValue"
    :inactive-value="item.switchInactiveValue"
    :active-text="item.switchActiveText"
    :inactive-text="item.switchInactiveText"
  />
</template>

<style></style>
