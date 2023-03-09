<script setup lang="ts">
import { watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { SelectFormItem } from '@cphayim-enc/base'
import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorIcon, FormEditorIcon } from '../../../icons'
import { useEditorItems } from '../../../hooks'
import { EncEditorFieldset } from '../../editor-fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { SELECT_ITEMS } from './items'

import EncSelectFormItemOptionEditor from './SelectFormItemOptionEditor.vue'

defineOptions({ name: 'EncSelectFormItemEditor' })

const props = defineProps<{
  config: VisualFormEditorConfig
  modelValue?: SelectFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(SELECT_ITEMS, props.config)
watchEffect(() => {
  updateItem('selectMultipleLimit', { hidden: !modelValue.value?.selectMultiple })
})

const handleAddOption = () => {
  modelValue.value?.selectOptions?.push({ label: 'label', value: 'value' })
}
const handleRemoveOption = (index: number) => {
  modelValue.value?.selectOptions?.splice(index, 1)
}
</script>

<template>
  <EncEditorFieldset title="下拉选择配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />

    <EncEditorFieldset>
      <template #title>
        <span class="enc-mr-[8px]">选项</span>
        <span
          @click="handleAddOption"
          class="enc-relative enc-z-20 enc-cursor-pointer enc-text-[16px] enc-leading-[24px] enc-text-gray-500 hover:enc-text-green-500"
        >
          <EncFormEditorIcon :name="FormEditorIcon.Add" />
        </span>
      </template>

      <template v-if="modelValue?.selectOptions">
        <div v-for="(_, index) in modelValue.selectOptions" :key="index" class="enc-flex">
          <EncSelectFormItemOptionEditor
            :config="props.config"
            v-model="modelValue.selectOptions[index]"
          />
          <span
            @click="handleRemoveOption(index)"
            class="enc-relative enc-z-20 enc-cursor-pointer enc-text-[16px] enc-leading-[24px] enc-text-gray-500 hover:enc-text-red-500"
          >
            <EncFormEditorIcon :name="FormEditorIcon.Remove" />
          </span>
        </div>
      </template>
    </EncEditorFieldset>
  </EncEditorFieldset>
</template>

<style></style>
