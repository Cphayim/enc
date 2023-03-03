<!-- 主面板 -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { FormItemUnion } from '@cphayim-enc/base'
import { formEditorTips, VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'
import type { VisualFormEditorInternalEmitter, VisualFormEditorSelectedItem } from '..'
import DrawableFormItem from './DrawableFormItem.vue'
import EmptyContainer from './EmptyContainer.vue'

defineOptions({ name: 'EncVisualFormEditorCenterPanel' })

const props = defineProps<{
  items: FormItemUnion[]
  config: VisualFormEditorConfig
  emitter: VisualFormEditorInternalEmitter
  selectedItem?: VisualFormEditorSelectedItem
}>()

const formItems = useVModel(props, 'items')
</script>

<template>
  <div class="enc-vfe-center-panel">
    <EncFormEditorTip :content="formEditorTips.center" />
    <div class="enc-flex enc-flex-wrap enc-mx-[-5px]">
      <EmptyContainer
        v-if="!formItems.length"
        :emitter="props.emitter"
        :emptyText="props.config.formItemEmptyText"
      />
      <template v-else>
        <DrawableFormItem
          v-for="(item, index) in formItems"
          :key="item.name"
          :item="item"
          :index="index"
          :emitter="props.emitter"
          :selectedItem="props.selectedItem"
        />
      </template>
    </div>
  </div>
</template>

<style>
.enc-vfe-center-panel {
  @apply enc-p-[20px];
}
</style>
