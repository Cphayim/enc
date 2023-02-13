<!-- 主面板 -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import type { FormItemUnion } from '@cphayim-enc/base'
import { formEditorTips, VisualFormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'

defineOptions({ name: 'EncVisualFormEditorCenterPanel' })

const props = defineProps<{
  items: FormItemUnion[]
  config: VisualFormEditorConfig
}>()

const formItems = useVModel(props, 'items')
</script>

<template>
  <div class="enc-visual-form-editor-center-panel">
    <EncFormEditorTip :content="formEditorTips.center" />
    <div class="enc-flex enc-flex-wrap enc-mx-[-5px]">
      <template v-for="item in formItems" :key="item.name">
        <div class="enc-visual-form-item-wrap" :data-col-span="item.col ?? 24">
          <div class="enc-visual-form-item">
            {{ item.label }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.enc-visual-form-editor-center-panel {
  @apply enc-p-[20px];
}
.enc-visual-form-item-wrap {
  @apply enc-p-[5px];
}
.enc-visual-form-item {
  @apply enc-p-[10px] enc-border-dotted enc-border-gray-300 enc-rounded-[6px];
  @apply enc-cursor-pointer;
  @apply enc-text-gray-500 enc-text-[14px];

  &.active {
    @apply enc-border-blue-500 enc-bg-blue-500 enc-bg-opacity-20;
  }
}
</style>
