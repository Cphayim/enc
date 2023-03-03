<!-- 右侧详情面板 -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { formEditorTips, VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'
import {
  EncBaseFormItemEditor,
  EncInputFormItemEditor,
  EncRulesFormItemEditor,
} from '../../form-item-editor'
import type { VisualFormEditorSelectedItem } from '..'
import type { FormItemUnion } from '@cphayim-enc/base'

defineOptions({ name: 'EncVisualFormEditorRightPanel' })

const props = defineProps<{
  config: VisualFormEditorConfig
  selectedItem?: VisualFormEditorSelectedItem
}>()

const selectedItem = useVModel(props, 'selectedItem')

const CompMap: Record<FormItemUnion['type'], any> = {
  input: EncInputFormItemEditor,
  select: null,
  cascader: null,
  date: null,
  time: null,
  upload: null,
  switch: null,
  radio: null,
  checkbox: null,
  custom: null,
}
</script>

<template>
  <div class="enc-vfe-right-panel">
    <EncFormEditorTip :content="formEditorTips.right" />
    <template v-if="selectedItem && selectedItem.type === 'select'">
      <div :key="selectedItem.index">
        <EncBaseFormItemEditor v-model="selectedItem.item" :config="props.config" />
        <EncRulesFormItemEditor v-model="selectedItem.item" :config="props.config" />
        <component
          :is="CompMap[selectedItem.item.type]"
          v-model="selectedItem.item"
          :config="props.config"
        />
      </div>
    </template>
  </div>
</template>

<style>
.enc-vfe-right-panel {
  @apply enc-w-[400px] enc-p-[20px] enc-border-0 enc-border-l enc-border-solid enc-border-gray-300;
}
</style>
