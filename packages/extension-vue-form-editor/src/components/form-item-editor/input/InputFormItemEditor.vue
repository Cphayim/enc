<script setup lang="ts">
import { watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { InputFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { INPUT_ITEMS } from './items'

defineOptions({ name: 'EncInputFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: InputFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(INPUT_ITEMS, props.config)
watchEffect(() => {
  updateItem('inputRows', { hidden: modelValue.value?.inputType !== 'textarea' })
})
</script>

<template>
  <EncFieldset title="输入框配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />
  </EncFieldset>
</template>

<style></style>
