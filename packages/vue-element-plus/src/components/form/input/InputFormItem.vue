<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { ElInput } from 'element-plus'
import 'element-plus/es/components/input/style/css'

import type { BaseFormItem, InputFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncInputFormItem' })

const props = defineProps<{
  modelValue?: any
  item: InputFormItem
}>()

const DEFAULT_OPTIONS: Omit<InputFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请输入',
  inputType: 'text',
  inputRows: 4,
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <el-input
    v-model="_value"
    :type="item.inputType"
    :readonly="item.readonly"
    :disabled="item.disabled"
    :placeholder="item.placeholder"
    :rows="item.inputRows"
    :maxlength="item.inputMaxLength"
    show-word-limit
    resize="none"
  />
</template>

<style></style>
