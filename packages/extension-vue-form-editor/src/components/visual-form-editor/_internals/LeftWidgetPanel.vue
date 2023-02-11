<!-- 左侧控件面板 -->
<script setup lang="ts">
import { EncFormEditorTip } from '../../form-editor-tip'
import { tips } from './tips'

defineOptions({ name: 'EncLeftWidgetPanel' })
</script>

<template>
  <div class="enc-left-widget-panel">
    <EncFormEditorTip :content="tips.left" />
  </div>
</template>

<style>
.enc-left-widget-panel {
  @apply enc-w-[320px] enc-p-[20px] enc-border-0 enc-border-r enc-border-solid enc-border-gray-300;
}
</style>
