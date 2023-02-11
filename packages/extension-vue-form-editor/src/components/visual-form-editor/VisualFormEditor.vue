<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FormItemUnion } from '@cphayim-enc/base'
import { useEmitter } from '@cphayim-enc/vue'

import type { VisualFormEditorConfig } from '../props'
import { DEFAULT_VISUAL_FORM_EDITOR_CONFIG } from '.'
import LeftWidgetPanel from './_internals/LeftWidgetPanel.vue'
import CenterMainPanel from './_internals/CenterMainPanel.vue'
import RightDetailPanel from './_internals/RightDetailPanel.vue'

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
const emitter = useEmitter()
</script>

<template>
  <div class="enc-visual-form-editor">
    <LeftWidgetPanel :config="config" :emitter="emitter" class="enc-flex-shrink-0" />
    <CenterMainPanel
      v-model:items="formItems"
      :config="config"
      :emitter="emitter"
      class="enc-flex-1"
    />
    <RightDetailPanel :emitter="emitter" class="enc-flex-shrink-0" />
  </div>
</template>

<style>
.enc-visual-form-editor {
  @apply enc-flex enc-min-h-[800px];
}
</style>
