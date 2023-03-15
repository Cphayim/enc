<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { RadioOptions } from '@cphayim-enc/base'
import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { RADIO_OPTION_ITEMS } from './items'

defineOptions({ name: 'EncRadioFormItemOptionEditor' })

const props = defineProps<{
  config: VisualFormEditorConfig
  modelValue?: RadioOptions
}>()

const modelValue = useVModel(props, 'modelValue')
const { EncForm, formRef, formItems } = useEditorItems(RADIO_OPTION_ITEMS, props.config)

const encFormProps = { ...COMMON_ENC_FORM_PROPS, labelWidth: 40 }
</script>

<template>
  <EncForm v-bind="encFormProps" v-model:data="modelValue" :items="formItems" ref="formRef" />
</template>

<style></style>
