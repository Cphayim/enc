<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { ElSelectV2 } from 'element-plus'
import 'element-plus/es/components/select-v2/style/css'

import type { BaseFormItem, SelectFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncSelectFormItem' })

const props = defineProps<{
  modelValue?: any
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
    :options="(item.selectOptions as any)"
  />
</template>

<style></style>
