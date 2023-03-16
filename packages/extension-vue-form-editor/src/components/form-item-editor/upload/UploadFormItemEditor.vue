<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { UploadFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { UPLOAD_ITEMS } from './items'

defineOptions({ name: 'EncUploadFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: UploadFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(UPLOAD_ITEMS, props.config)

const isFile = computed(() => modelValue.value?.uploadType === 'file')
const isMultiple = computed(() => modelValue.value?.uploadMultiple)

watchEffect(() => {
  updateItem('uploadButtonText', { hidden: !isFile.value })
  updateItem('uploadMultipleLimit', { hidden: !isMultiple.value })
})
</script>

<template>
  <EncFieldset title="上传配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />
  </EncFieldset>
</template>

<style></style>
