<!-- 右侧详情面板 -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { formEditorTips, VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'
import { EncBaseFormItemEditor, EncRulesFormItemEditor } from '../../form-item-editor'
import type { VisualFormEditorSelectedItem } from '..'

defineOptions({ name: 'EncVisualFormEditorRightPanel' })

const props = defineProps<{
  config: VisualFormEditorConfig
  selectedItem?: VisualFormEditorSelectedItem
}>()

const selectedItem = useVModel(props, 'selectedItem')
</script>

<template>
  <div class="enc-visual-form-editor-right-panel">
    <EncFormEditorTip :content="formEditorTips.right" />
    <template v-if="selectedItem && selectedItem.type === 'select'">
      <div :key="selectedItem.index">
        <EncBaseFormItemEditor v-model="selectedItem.item" :config="props.config" />
        <EncRulesFormItemEditor v-model="selectedItem.item" :config="props.config" />
      </div>
    </template>
  </div>
</template>

<style>
.enc-visual-form-editor-right-panel {
  @apply enc-w-[400px] enc-p-[20px] enc-border-0 enc-border-l enc-border-solid enc-border-gray-300;
}
</style>
