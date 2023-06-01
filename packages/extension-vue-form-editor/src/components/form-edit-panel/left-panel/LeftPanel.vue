<!-- 左侧控件面板 -->
<script setup lang="ts">
import { computed } from 'vue'

import {
  type FormEditorConfig,
  type FormEditorPreset,
  getPresetFeatureGroups,
  formEditorTips,
} from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'
import type { FormEditorInternalEmitter } from '..'
import DrawableFeature from './DrawableFeature.vue'
import type { FormItemUnion } from '@cphayim-enc/base'

defineOptions({ name: 'EncLeftPanel' })

const props = defineProps<{
  items: FormItemUnion[]
  config: FormEditorConfig
  emitter: FormEditorInternalEmitter
}>()

const presetSet = computed<Set<FormEditorPreset>>(() => new Set(props.config.presets))
const presetFeatureGroups = computed(() => getPresetFeatureGroups(presetSet.value))

const bizFeatures = computed(() => props.config.bizFeatures)
</script>

<template>
  <div class="enc-edit-panel-left-panel">
    <EncFormEditorTip :content="formEditorTips.left" />

    <!-- preset features -->
    <template v-for="group in presetFeatureGroups" :key="group.groupName">
      <div v-if="group.features.length" class="enc-edit-panel-feature-group">
        <div class="enc-edit-panel-feature-group-name">{{ group.groupName }}</div>
        <div class="enc-flex enc-flex-wrap">
          <template v-for="feature in group.features" :key="feature.presetName">
            <DrawableFeature :feature="feature" :emitter="props.emitter" :items="props.items" />
          </template>
        </div>
      </div>
    </template>

    <!-- biz features -->
    <div v-if="bizFeatures" class="enc-edit-panel-feature-group">
      <div class="enc-edit-panel-feature-group-name">业务/组合型控件</div>
      <div class="enc-flex enc-flex-wrap">
        <template v-for="feature in bizFeatures" :key="feature.presetName">
          <DrawableFeature :feature="feature" :emitter="props.emitter" :items="props.items" />
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.enc-edit-panel-left-panel {
  @apply enc-w-[320px] enc-p-[20px] enc-border-0 enc-border-r enc-border-solid enc-border-gray-300;
}
.enc-edit-panel-feature-group {
  @apply enc-mb-[16px] enc-mx-[-5px];
}
.enc-edit-panel-feature-group-name {
  @apply enc-pl-[8px] enc-border-0 enc-border-solid enc-border-l-[3px] enc-border-blue-500;
  @apply enc-ml-[5px] enc-mb-[16px] enc-text-gray-600 enc-text-[16px] enc-leading-[16px];
}
</style>
