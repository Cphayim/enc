<script setup lang="ts">
import { computed, ref, toRaw } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { useFormItems } from '@cphayim-enc/vue'
import {
  BizFeatureFormEditorTransformer,
  FormEditorConfig,
  FormEditorOperation,
} from '@cphayim-enc/extension-form-editor'

import { EncFormPreview } from '../form-preview'
import { EncFormEditPanel } from '../form-edit-panel'
import { DEFAULT_FORM_EDITOR_CONFIG } from './config'

defineOptions({ name: 'EncFormEditor' })

type Props = {
  /**
   * 初始化表单编辑器中的 formItems 数组
   * @default []
   */
  initItems?: FormItemUnion[]
  /**
   * 表单编辑器配置项
   */
  config: FormEditorConfig
}
const props = withDefaults(defineProps<Props>(), { config: () => ({}) })
const emit = defineEmits<{
  (e: 'confirm', items: FormItemUnion[]): void
}>()

const config = computed(() => ({
  ...DEFAULT_FORM_EDITOR_CONFIG,
  ...props.config,
}))

const { formItems } = useFormItems(
  BizFeatureFormEditorTransformer.toPlaceHolder(
    toRaw(props.initItems ?? []),
    config.value.bizFeatures ?? [],
  ),
)

const getFormItems = () =>
  BizFeatureFormEditorTransformer.toReal(toRaw(formItems.value), config.value.bizFeatures ?? [])

const handleConfirm = () => {
  emit('confirm', getFormItems())
}

const isPreview = ref(false)
const handleTogglePreview = () => {
  isPreview.value = !isPreview.value
}

const handlePrint = () => {
  console.log(getFormItems())
}

const hasOperation = (operation: FormEditorOperation) =>
  props.config.operations?.includes(operation)

defineExpose({ getFormItems })
</script>

<template>
  <div class="enc-form-editor">
    <!-- preview -->
    <template v-if="isPreview">
      <EncFormPreview
        :encFormComponent="props.config.encFormComponent"
        :encFormProps="props.config.encFormProps"
        :items="getFormItems()"
      />
    </template>

    <!-- edit -->
    <template v-else>
      <EncFormEditPanel
        v-model:items="formItems"
        :config="config"
        ref="formEditorInstRef"
      ></EncFormEditPanel>
    </template>

    <!-- bottom operation area -->
    <div class="enc-form-editor-operation-box">
      <div
        v-if="hasOperation(FormEditorOperation.Confirm)"
        @click="handleConfirm"
        class="enc-form-editor-operation-btn"
      >
        确认
      </div>
      <div @click="handleTogglePreview" class="enc-form-editor-operation-btn">
        {{ isPreview ? '退出预览' : '预览' }}
      </div>
      <div @click="handlePrint" class="enc-form-editor-operation-btn">获取配置项</div>
    </div>
  </div>
</template>

<style>
.enc-form-editor {
  @apply enc-select-none;
  > * {
    @apply enc-box-border;
  }
  .enc-form-editor-operation-box {
    @apply enc-flex enc-justify-center enc-items-center enc-gap-[10px] enc-py-[10px];
  }
  .enc-form-editor-operation-btn {
    @apply enc-px-[15px] enc-py-[8px] enc-text-center enc-text-[14px] enc-text-white enc-rounded enc-clickable enc-bg-blue-500;
  }
}
</style>
