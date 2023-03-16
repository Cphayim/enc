<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { TimeFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { TIME_ITEMS } from './items'

defineOptions({ name: 'EncTimeFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: TimeFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems } = useEditorItems(TIME_ITEMS, props.config)
</script>

<template>
  <EncFieldset title="时间选择配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />
  </EncFieldset>
</template>

<style></style>
