<script setup lang="ts">
import type { FormItemUnion } from '@cphayim-enc/base'
import { useFormItems } from '@cphayim-enc/vue'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncVisualFormEditor } from '../visual-form-editor'
import { EncCodeFormEditor } from '../code-form-editor'

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
  config?: FormEditorConfig
}
const props = withDefaults(defineProps<Props>(), { config: () => ({ mode: 'visual' }) })
const emit = defineEmits<{
  (e: 'confirm', items: FormItemUnion[]): void
}>()

const { formItems } = useFormItems(props.initItems ?? [])

const getItems = () => formItems.value

const handleConfirm = () => {
  emit('confirm', getItems())
  console.log(getItems())
}

defineExpose({ getItems })
</script>

<template>
  <div class="enc-form-editor">
    <component
      :is="props.config.mode === 'visual' ? EncVisualFormEditor : EncCodeFormEditor"
      v-model:items="formItems"
      :config="props.config"
      ref="formEditorInstRef"
    ></component>
    <div class="enc-flex enc-justify-center">
      <div @click="handleConfirm" class="enc-form-editor-opt-btn enc-bg-blue-400">获取配置项</div>
    </div>
  </div>
</template>

<style>
.enc-form-editor {
  @apply enc-select-none;
  > * {
    @apply enc-box-border;
  }
  .enc-form-editor-opt-btn {
    @apply enc-px-[15px] enc-py-[8px] enc-text-center enc-text-[14px] enc-text-white enc-rounded enc-clickable;
  }
}
</style>
