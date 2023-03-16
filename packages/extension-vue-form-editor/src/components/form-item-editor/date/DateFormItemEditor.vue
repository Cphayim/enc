<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { DateFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { DATE_ITEMS } from './items'

defineOptions({ name: 'EncDateFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: DateFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(DATE_ITEMS, props.config)

const isRange = computed(() => modelValue.value?.dateType === 'daterange')

watchEffect(() => {
  updateItem('dateRangeSeparator', { hidden: !isRange.value })
  updateItem('dateRangeStartPlaceholder', { hidden: !isRange.value })
  updateItem('dateRangeEndPlaceholder', { hidden: !isRange.value })
})
</script>

<template>
  <EncFieldset title="日期选择配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />
  </EncFieldset>
</template>

<style></style>
