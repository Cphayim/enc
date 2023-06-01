<script setup lang="ts">
import { watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { SelectFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorIcon, FormEditorIcon } from '../../../icons'
import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { SELECT_ITEMS } from './items'

import EncSelectFormItemOptionEditor from './SelectFormItemOptionEditor.vue'

defineOptions({ name: 'EncSelectFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: SelectFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(SELECT_ITEMS, props.config)
watchEffect(() => {
  updateItem('selectMultipleLimit', { hidden: !modelValue.value?.selectMultiple })
})

const handleAddOption = () => {
  if (!modelValue.value) return
  if (!modelValue.value.selectOptions) {
    modelValue.value.selectOptions = []
  }
  modelValue.value.selectOptions?.push({ label: '选项', value: '选项' })
}
const handleRemoveOption = (index: number) => {
  modelValue.value?.selectOptions?.splice(index, 1)
}
</script>

<template>
  <EncFieldset title="下拉选择配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />

    <EncFieldset>
      <template #title>
        <span class="enc-mr-[8px]">选项配置</span>
        <span
          @click="handleAddOption"
          class="enc-relative enc-z-20 enc-cursor-pointer enc-text-[16px] enc-leading-[24px] enc-text-gray-500 hover:enc-text-green-500"
        >
          <EncFormEditorIcon :name="FormEditorIcon.Add" />
        </span>
      </template>

      <div
        v-if="modelValue?.selectOptions && modelValue.selectOptions.length"
        class="enc-pt-[10px]"
      >
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
      </div>
      <div v-else class="enc-py-[20px] enc-text-[14px] enc-text-gray-400 enc-text-center">
        暂无选项
      </div>
    </EncFieldset>
  </EncFieldset>
</template>

<style></style>
