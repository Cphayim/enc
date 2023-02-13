<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import type { FormItemUnion } from '@cphayim-enc/base'
import type { VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'
import { useEmitter } from '@cphayim-enc/vue'

import { DEFAULT_VISUAL_FORM_EDITOR_CONFIG, VisualFormEditorInternalEvents } from '.'
import { EncVisualFormEditorLeftPanel } from './left-panel'
import { EncVisualFormEditorCenterPanel } from './center-panel'
import { EncVisualFormEditorRightPanel } from './right-panel'

defineOptions({ name: 'EncVisualFormEditor' })

type Props = {
  /**
   * 表单编辑器中的 formItems 数组
   * @default []
   */
  items: FormItemUnion[]
  /**
   * 表单编辑器配置项
   */
  config?: VisualFormEditorConfig
}
const props = defineProps<Props>()

const emit = defineEmits<(e: 'update:items', v: FormItemUnion[]) => void>()

const formItems = useVModel(props, 'items', emit)

const config = computed<VisualFormEditorConfig>(() => ({
  ...DEFAULT_VISUAL_FORM_EDITOR_CONFIG,
  ...props.config,
}))

// 发布/订阅器
const emitter = useEmitter<VisualFormEditorInternalEvents>()
</script>

<template>
  <DndProvider :backend="HTML5Backend">
    <div class="enc-visual-form-editor">
      <EncVisualFormEditorLeftPanel :config="config" :emitter="emitter" class="enc-flex-shrink-0" />
      <EncVisualFormEditorCenterPanel
        v-model:items="formItems"
        :config="config"
        :emitter="emitter"
        class="enc-flex-1"
      />
      <EncVisualFormEditorRightPanel :emitter="emitter" class="enc-flex-shrink-0" />
    </div>
  </DndProvider>
</template>

<style>
.enc-visual-form-editor {
  @apply enc-flex enc-min-h-[800px];
}
</style>
