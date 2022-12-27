<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, useSlots } from 'vue'

import type { BaseFormItem, InputFormItem } from '@cphayim-enc/base'
import { useEventLock } from '@cphayim-enc/vue'

defineOptions({ name: 'EncInputFormItem' })

const props = defineProps<{
  item: InputFormItem
  modelValue: any
  // 内部属性，当其它表单组件引用该组件时，该值为 true
  _readonly?: boolean
  // 内部属性，当选择器组件引用该组件时，该值为 true
  _isLink?: boolean
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

const _value = useVModel(props, 'modelValue', emit)

const handleFieldClick = useEventLock(() => {
  if (item.value.readonly || item.value.disabled) return
  emit('click')
})

const slots = useSlots()
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
    :rules="(item.rules as any)"
    :input-align="item.align ?? item.inputType === 'textarea' ? 'left' : 'right'"
    :type="item.inputType"
    :rows="item.inputRows"
    :maxlength="item.inputMaxLength"
    autosize
    show-word-limit
    @click="handleFieldClick"
  >
    <template v-if="slots.label" #label><slot name="label" /></template>
    <template v-if="slots.input" #input><slot name="input" /></template>
    <template v-if="slots.leftIcon" #left-icon><slot name="left-icon" /></template>
    <template v-if="slots.rightIcon" #right-icon><slot name="right-icon" /></template>
    <template v-if="slots.button" #button><slot name="button" /></template>
  </van-field>
</template>

<style></style>
