<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { RadioOptions } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useSyncOptionsEditorItems } from '../../../hooks'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { RADIO_OPTION_ITEMS } from './items'

defineOptions({ name: 'EncRadioFormItemOptionEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: RadioOptions
}>()

const modelValue = useVModel(props, 'modelValue')
const { EncForm, formRef, formItems } = useSyncOptionsEditorItems(
  RADIO_OPTION_ITEMS,
  props.config,
  modelValue,
)

const encFormProps = { ...COMMON_ENC_FORM_PROPS, labelWidth: 40 }
</script>

<template>
  <EncForm v-bind="encFormProps" v-model:data="modelValue" :items="formItems" ref="formRef" />
</template>

<style></style>
