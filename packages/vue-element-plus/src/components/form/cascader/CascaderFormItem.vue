<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { ElCascader } from 'element-plus'
import 'element-plus/es/components/cascader/style/css'

import type { BaseFormItem, CascaderFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncCascaderFormItem' })

const props = defineProps<{
  modelValue?: any
  item: CascaderFormItem
}>()

const DEFAULT_OPTIONS: Omit<CascaderFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  cascaderMultiple: false,
  cascaderFilterable: false,
  cascaderOptions: [],
  cascaderCheckStrictly: false,
  cascaderEmitPath: false,
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
const _cascaderProps = computed(() => {
  return {
    multiple: item.value.cascaderMultiple,
    expandTrigger: 'click',
    checkStrictly: item.value.cascaderCheckStrictly,
    emitPath: item.value.cascaderEmitPath,
  } as any
})
</script>

<template>
  <el-cascader
    v-model="_value"
    :placeholder="item.placeholder"
    :options="item.cascaderOptions"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :props="_cascaderProps"
    :clearable="item.clearable"
    :filterable="item.cascaderFilterable"
  />
</template>

<style></style>
