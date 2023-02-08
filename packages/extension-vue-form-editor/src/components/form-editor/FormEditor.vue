<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { FormItemUnion } from '@cphayim-enc/base'

import type { FormEditorConfig } from '../props'
import { EncVisualFormEditor } from '../visual-form-editor'
import { EncCodeFormEditor } from '../code-form-editor'

defineOptions({ name: 'EncFormEditor' })

type Props = {
  /**
   * 表单编辑器中的 formItems 数组
   * @default []
   */
  items?: FormItemUnion[]
  /**
   * 表单编辑器配置项
   */
  config?: FormEditorConfig
}
const props = withDefaults(defineProps<Props>(), {
  config: () => ({ mode: 'visual' }),
})
const emit = defineEmits<(e: 'update:items', v: FormItemUnion[]) => void>()

const formItems = useVModel(props, 'items', emit)
</script>

<template>
  <div class="enc-form-editor-wrap">
    <component
      :is="props.config.mode === 'visual' ? EncVisualFormEditor : EncCodeFormEditor"
      v-model:items="formItems"
      :config="props.config"
    ></component>
  </div>
</template>

<style>
.enc-form-editor-wrap {
}
</style>
