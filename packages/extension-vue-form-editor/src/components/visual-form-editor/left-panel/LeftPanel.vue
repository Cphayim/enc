<!-- 左侧控件面板 -->
<script setup lang="ts">
import { computed } from 'vue'

import {
  type VisualFormEditorConfig,
  type FormEditorPreset,
  getPresetFeatureGroups,
  formEditorTips,
} from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'
import type { VisualFormEditorInternalEvents } from '..'

defineOptions({ name: 'EncVisualFormEditorLeftPanel' })

const props = defineProps<{
  config: VisualFormEditorConfig
  emitter: VisualFormEditorInternalEvents
}>()

const presetSet = computed<Set<FormEditorPreset>>(() => new Set(props.config.presets))
const presetFeatureGroups = computed(() => getPresetFeatureGroups(presetSet.value))
</script>

<template>
  <div class="enc-visual-form-editor-left-panel">
    <EncFormEditorTip :content="formEditorTips.left" />
    <!-- preset features -->
    <div v-for="group in presetFeatureGroups" :key="group.groupName" class="enc-feature-group">
      <div class="enc-feature-label">{{ group.groupName }}</div>
      <div class="enc-flex enc-flex-wrap">
        <div
          v-for="feature in group.features"
          :key="feature.presetName"
          :data-col-span="feature.presetLabel.length > 4 ? 24 : 12"
        >
          <div class="enc-feature-btn">
            {{ feature.presetLabel }}
          </div>
        </div>
      </div>
    </div>
    <!-- biz features -->
    <div class="enc-feature-group">
      <div class="enc-feature-label">业务型控件</div>
      <div class="enc-flex enc-flex-wrap">
        <div :data-col-span="'报价组合控件'.length > 4 ? 24 : 12">
          <div class="enc-feature-btn">
            <span>报价组合控件</span>
            <span class="enc-text-[12px] enc-text-gray-400">物品+数量+单价</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.enc-visual-form-editor-left-panel {
  @apply enc-w-[320px] enc-p-[20px] enc-border-0 enc-border-r enc-border-solid enc-border-gray-300;
  .enc-feature-group {
    @apply enc-mb-[10px] enc-mx-[-5px];
  }
  .enc-feature-label {
    @apply enc-ml-[5px] enc-mb-[10px] enc-text-gray-500 enc-text-[14px];
  }
  .enc-feature-btn {
    @apply enc-flex enc-flex-col enc-items-center enc-justify-center;
    @apply enc-min-h-[40px] enc-py-[5px] enc-mb-[10px] enc-mx-[5px] enc-cursor-pointer enc-rounded-[4px];
    @apply enc-text-gray-500 enc-text-[14px] enc-bg-gray-100;
    &:hover {
      @apply enc-bg-gray-200;
    }
  }
}
</style>
