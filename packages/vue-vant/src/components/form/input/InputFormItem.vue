<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { useVModel } from '@vueuse/core'
import { Field as VanField } from 'vant'
import 'vant/es/field/style/index'

import type { BaseFormItem, InputFormItem } from '@cphayim-enc/base'
import { useEventLock } from '@cphayim-enc/vue'

import {
  DEFAULT_FORM_INTERNAL_CONFIG,
  FormInternalConfig,
  FORM_INTERNAL_CONFIG_KEY,
} from '../form/provide'

defineOptions({ name: 'EncInputFormItem' })

const props = defineProps<{
  item: InputFormItem
  modelValue?: any
  // 内部属性，当其它表单组件引用该组件时，该值为 true
  _readonly?: boolean
  // 内部属性，当选择器组件引用该组件时，该值为 true
  _isLink?: boolean
  // 内部属性，控制 label 的位置，优先级大于 form provide
  _labelAlign?: 'top' | 'left' | 'right'
  // 内部属性，隐藏 input 框（包括高度）
  _hideInput?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'update:modelValue', value: any): void
}>()

const DEFAULT_OPTIONS: Omit<InputFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请输入',
  inputType: 'text',
  inputRows: 4,
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// vant rule.pattern 不直接支持字符串，需要转换为 RegExp
const rules = computed(() => {
  if (!item.value.rules) return []
  return item.value.rules.map((rule) => ({
    ...rule,
    pattern: typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern,
  }))
})

const _value = useVModel(props, 'modelValue', emit)

const handleFieldClick = useEventLock(() => {
  if (item.value.readonly || item.value.disabled) return
  emit('click')
})

const slots = useSlots()

const formInternalConfig = inject<FormInternalConfig>(
  FORM_INTERNAL_CONFIG_KEY,
  DEFAULT_FORM_INTERNAL_CONFIG,
)
const labelWidth = computed(() => formInternalConfig.labelWidth)
const labelAlign = computed(() => props._labelAlign ?? formInternalConfig.labelPosition)
const inputAlign = computed(() => {
  if (item.value.align) return item.value.align
  if (labelAlign.value === 'top') return 'left'
  return item.value.inputType === 'textarea' ? 'left' : 'right'
})

const isRequired = computed(() => item.value.rules?.some((rule) => rule.required))
</script>

<template>
  <van-field
    :label="item.label"
    :name="item.name"
    v-model="_value"
    :readonly="props._readonly || item.readonly"
    :disabled="item.disabled"
    :placeholder="item.placeholder"
    :is-link="props._isLink"
    :rules="rules"
    :label-width="labelWidth"
    :label-align="labelAlign"
    :input-align="inputAlign"
    :type="item.inputType"
    :rows="item.inputRows"
    :maxlength="item.inputMaxLength"
    autosize
    show-word-limit
    :required="isRequired"
    @click="handleFieldClick"
    :class="{ 'enc-hidden-input': props._hideInput }"
  >
    <template v-if="slots.label" #label><slot name="label" /></template>

    <template v-if="props._hideInput" #input></template>
    <template v-else-if="slots.input" #input><slot name="input" /></template>

    <template v-if="slots.leftIcon" #left-icon><slot name="left-icon" /></template>
    <template v-if="slots.rightIcon" #right-icon><slot name="right-icon" /></template>
    <template v-if="slots.button" #button><slot name="button" /></template>
  </van-field>
</template>

<style>
.enc-hidden-input {
  /* --van-cell-line-height: 0; */
  .van-field__control--custom {
    @apply enc-hidden;
  }
}
</style>
