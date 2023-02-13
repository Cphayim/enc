<script setup lang="ts">
import type { FormItemUnion } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'
import { useFormItems } from '@cphayim-enc/vue'

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

const { formItems } = useFormItems(props.initItems ?? [])
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
  > * {
    @apply enc-box-border;
  }
}
</style>
