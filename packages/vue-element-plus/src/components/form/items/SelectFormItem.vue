<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { BaseFormItem, SelectFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncSelectFormItem' })

const props = defineProps<{
  modelValue: any
  item: SelectFormItem
}>()

const DEFAULT_OPTIONS: Omit<SelectFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  selectMultiple: false,
  selectFilterable: false,
  selectOptions: [],
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <el-select-v2
    v-model="_value"
    :placeholder="item.placeholder"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :multiple="item.selectMultiple"
    :filterable="item.selectFilterable"
    :clearable="item.clearable"
    :options="item.selectOptions"
  />
</template>

<style></style>
