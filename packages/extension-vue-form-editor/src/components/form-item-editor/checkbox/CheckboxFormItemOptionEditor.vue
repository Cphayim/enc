<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { CheckboxOptions } from '@cphayim-enc/base'
import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { CHECKBOX_OPTION_ITEMS } from './items'

defineOptions({ name: 'EncCheckboxFormItemOptionEditor' })

const props = defineProps<{
  config: VisualFormEditorConfig
  modelValue?: CheckboxOptions
}>()

const modelValue = useVModel(props, 'modelValue')
const { EncForm, formRef, formItems } = useEditorItems(CHECKBOX_OPTION_ITEMS, props.config)

const encFormProps = { ...COMMON_ENC_FORM_PROPS, labelWidth: 40 }
</script>

<template>
  <EncForm v-bind="encFormProps" v-model:data="modelValue" :items="formItems" ref="formRef" />
</template>

<style></style>
