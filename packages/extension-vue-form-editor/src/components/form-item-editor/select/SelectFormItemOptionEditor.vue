<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { SelectFormItemOption } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useSyncOptionsEditorItems } from '../../../hooks'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { SELECT_OPTION_ITEMS } from './items'

defineOptions({ name: 'EncSelectFormItemOptionEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: SelectFormItemOption
}>()

const modelValue = useVModel(props, 'modelValue')
const { EncForm, formRef, formItems } = useSyncOptionsEditorItems(
  SELECT_OPTION_ITEMS,
  props.config,
  modelValue,
)

const encFormProps = { ...COMMON_ENC_FORM_PROPS, labelWidth: 40 }
</script>

<template>
  <EncForm v-bind="encFormProps" v-model:data="modelValue" :items="formItems" ref="formRef" />
</template>

<style></style>
