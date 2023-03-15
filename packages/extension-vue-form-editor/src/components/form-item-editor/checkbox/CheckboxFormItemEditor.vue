<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

import type { CheckboxFormItem, RadioOptions } from '@cphayim-enc/base'
import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorIcon, FormEditorIcon } from '../../../icons'
import { useEditorItems } from '../../../hooks'
import { EncEditorFieldset } from '../../editor-fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { CHECKBOX_ITEMS } from './items'
import EncRadioFormItemOptionEditor from './CheckboxFormItemOptionEditor.vue'

defineOptions({ name: 'EncCheckboxFormItemEditor' })

const props = defineProps<{
  config: VisualFormEditorConfig
  modelValue?: CheckboxFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const { EncForm, formRef, formItems, updateItem } = useEditorItems(CHECKBOX_ITEMS, props.config)

const isGroup = computed(() => modelValue.value?.checkboxType === 'group')
watchEffect(() => {
  updateItem('checkboxSingleLabel', { hidden: isGroup.value })
  updateItem('checkboxSingleTrueValue', { hidden: isGroup.value })
  updateItem('checkboxSingleFalseValue', { hidden: isGroup.value })
  updateItem('checkboxGroupMax', { hidden: !isGroup.value })
})

const handleAddOption = () => {
  if (!modelValue.value) return
  if (!modelValue.value.checkboxGroupOptions) {
    modelValue.value.checkboxGroupOptions = []
  }
  modelValue.value.checkboxGroupOptions?.push({ label: 'label', value: 'value' })
}
const handleRemoveOption = (index: number) => {
  modelValue.value?.checkboxGroupOptions?.splice(index, 1)
}

// (CheckboxLabelOrValue | CheckboxOptions)[] -> CheckboxOptions[]
function initTransformCheckboxOptions() {
  if (!modelValue.value) return
  modelValue.value.checkboxGroupOptions = modelValue.value.checkboxGroupOptions?.map((option) =>
    typeof option === 'object' ? option : { label: option?.toString(), value: option?.toString() },
  )
}

initTransformCheckboxOptions()
</script>

<template>
  <EncEditorFieldset title="多选框配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="modelValue"
      :items="formItems"
      ref="formRef"
    />

    <!-- 分组选项 -->
    <EncEditorFieldset v-show="isGroup">
      <template #title>
        <span class="enc-mr-[8px]">组选项</span>
        <span
          @click="handleAddOption"
          class="enc-relative enc-z-20 enc-cursor-pointer enc-text-[16px] enc-leading-[24px] enc-text-gray-500 hover:enc-text-green-500"
        >
          <EncFormEditorIcon :name="FormEditorIcon.Add" />
        </span>
      </template>

      <div v-if="modelValue?.checkboxGroupOptions" class="enc-pt-[10px]">
        <div v-for="(_, index) in modelValue.checkboxGroupOptions" :key="index" class="enc-flex">
          <EncRadioFormItemOptionEditor
            :config="props.config"
            v-model="(modelValue.checkboxGroupOptions[index]) as RadioOptions"
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
    </EncEditorFieldset>
  </EncEditorFieldset>
</template>

<style></style>
