<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { SwitchFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { SWITCH_ITEMS } from './items'

defineOptions({ name: 'EncSwitchFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: SwitchFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems } = useEditorItems(SWITCH_ITEMS, props.config)
</script>

<template>
  <EncFieldset title="开关配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />
  </EncFieldset>
</template>

<style></style>
