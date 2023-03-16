<script setup lang="ts">
import { watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { BaseFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncEditorFieldset } from '../../editor-fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { BASE_ITEMS } from './items'

defineOptions({ name: 'EncBaseFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: BaseFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(BASE_ITEMS, props.config)
watchEffect(() => {
  updateItem('name', { disabled: props.config.randomNameOnly })
})
</script>

<template>
  <EncEditorFieldset title="基本配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />
  </EncEditorFieldset>
</template>

<style></style>
