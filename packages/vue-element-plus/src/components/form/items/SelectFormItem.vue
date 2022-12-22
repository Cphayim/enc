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
  selectType: 'select',
  selectMultiple: false,
  selectFilterable: false,
  selectOptions: [],
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
const _cascaderProps = computed(() => {
  return {
    multiple: item.value.selectMultiple,
    expandTrigger: 'click',
  } as any
})
</script>

<template>
  <!-- 下拉级联选择 -->
  <template v-if="item.selectType === 'cascader'">
    <el-cascader
      v-model="_value"
      :placeholder="item.placeholder"
      :options="item.selectOptions"
      :readonly="item.readonly"
      :disabled="item.disabled"
      :props="_cascaderProps"
    />
  </template>

  <!-- 下拉选择 -->
  <template v-else>
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
</template>

<style></style>
