<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { RadioFormItem, RadioOptions } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorIcon, FormEditorIcon } from '../../../icons'
import { useEditorItems } from '../../../hooks'
import { EncFieldset } from '../../fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { RADIO_ITEMS } from './items'
import EncRadioFormItemOptionEditor from './RadioFormItemOptionEditor.vue'

defineOptions({ name: 'EncRadioFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue?: RadioFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems } = useEditorItems(RADIO_ITEMS, props.config)

const handleAddOption = () => {
  if (!modelValue.value) return
  if (!modelValue.value.radioOptions) {
    modelValue.value.radioOptions = []
  }
  modelValue.value.radioOptions?.push({ label: 'label', value: 'value' })
}
const handleRemoveOption = (index: number) => {
  modelValue.value?.radioOptions?.splice(index, 1)
}

// (RadioLabelOrValue | RadioOptions)[] -> RadioOptions[]
function initTransformRadioOptions() {
  if (!modelValue.value) return
  modelValue.value.radioOptions = modelValue.value.radioOptions?.map((option) =>
    typeof option === 'object' ? option : { label: option?.toString(), value: option?.toString() },
  )
}

initTransformRadioOptions()
</script>

<template>
  <EncFieldset title="单选框配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />

    <EncFieldset>
      <template #title>
        <span class="enc-mr-[8px]">选项</span>
        <span
          @click="handleAddOption"
          class="enc-relative enc-z-20 enc-cursor-pointer enc-text-[16px] enc-leading-[24px] enc-text-gray-500 hover:enc-text-green-500"
        >
          <EncFormEditorIcon :name="FormEditorIcon.Add" />
        </span>
      </template>

      <div v-if="modelValue?.radioOptions && modelValue.radioOptions.length" class="enc-pt-[10px]">
        <div v-for="(_, index) in modelValue.radioOptions" :key="index" class="enc-flex">
          <EncRadioFormItemOptionEditor
            :config="props.config"
            v-model="(modelValue.radioOptions[index]) as RadioOptions"
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
