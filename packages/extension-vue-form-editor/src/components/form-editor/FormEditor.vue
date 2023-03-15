<script setup lang="ts">
import { ref } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { useFormItems } from '@cphayim-enc/vue'
import { FormEditorConfig, FormEditorOperation } from '@cphayim-enc/extension-form-editor'

import { EncVisualFormEditor } from '../visual-form-editor'
import { EncCodeFormEditor } from '../code-form-editor'
import { EncFormPreview } from '../form-preview'

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
const props = withDefaults(defineProps<Props>(), { config: () => ({ mode: 'visual' }) })
const emit = defineEmits<{
  (e: 'confirm', items: FormItemUnion[]): void
}>()

const { formItems } = useFormItems(props.initItems ?? [])

const getItems = () => {
  return formItems.value
}

const handleConfirm = () => {
  emit('confirm', getItems())
  console.log(getItems())
}

const isPreview = ref(false)
const handleTogglePreview = () => {
  isPreview.value = !isPreview.value
}

const hasOperation = (operation: FormEditorOperation) =>
  props.config.operations?.includes(operation)

defineExpose({ getItems })
</script>

<template>
  <div class="enc-form-editor">
    <template v-if="isPreview">
      <EncFormPreview
        :encFormComponent="props.config.encFormComponent"
        :encFormProps="props.config.encFormProps"
        :items="getItems()"
      />
    </template>
    <template v-else>
      <component
        :is="props.config.mode === 'visual' ? EncVisualFormEditor : EncCodeFormEditor"
        v-model:items="formItems"
        :config="props.config"
        ref="formEditorInstRef"
      ></component>
    </template>

    <!-- bottom operation area -->
    <div class="enc-form-editor-operation-box">
      <div
        v-if="hasOperation(FormEditorOperation.Submit)"
        @click="handleConfirm"
        class="enc-form-editor-operation-btn"
      >
        提交
      </div>
      <div @click="handleTogglePreview" class="enc-form-editor-operation-btn">
        {{ isPreview ? '退出预览' : '预览' }}
      </div>
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
