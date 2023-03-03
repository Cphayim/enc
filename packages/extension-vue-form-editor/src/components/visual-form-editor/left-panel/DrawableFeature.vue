<!-- 可拖动的预设/业务功能项 -->
<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useDrag } from '@ombro/dnd-vue'

import { useEventLock } from '@cphayim-enc/vue'
import {
  FormEditorBizFeature,
  FormEditorPresetFeature,
  isPresetFeature,
} from '@cphayim-enc/extension-form-editor'
import { DnDTypes, type DragFeature } from '../dnd'
import type { VisualFormEditorInternalEmitter } from '..'

defineOptions({ name: 'EncVisualFormEditorDrawableFeature' })

const props = defineProps<{
  feature: FormEditorPresetFeature | FormEditorBizFeature
  emitter: VisualFormEditorInternalEmitter
}>()

const feature = toRef(props, 'feature')

const [_, drag] = useDrag({
  type: DnDTypes.Feature,
  item: (): DragFeature => {
    return { type: 'feature', feature: props.feature, currentIndex: undefined }
  },
  collect: (monitor: any) => ({
    isDragging: monitor.isDragging(),
  }),
})

const colSpan = computed(() =>
  (isPresetFeature(feature.value)
    ? feature.value.presetLabel.length
    : feature.value.bizLabel.length) > 4
    ? 24
    : 12,
)
const label = computed(() =>
  isPresetFeature(feature.value) ? feature.value.presetLabel : feature.value.bizLabel,
)
const desc = computed(() =>
  isPresetFeature(feature.value) ? feature.value.presetDesc : feature.value.bizDesc,
)

const handleAdd = useEventLock(() => {
  props.emitter.emit('add-item-by-feature', { feature: props.feature })
})
</script>

<template>
  <div :data-col-span="colSpan">
    <div @click="handleAdd" :ref="drag" class="enc-vfe-feature-btn">
      <span>{{ label }}</span>
      <span v-if="desc" class="enc-text-[12px] enc-text-gray-500 enc-font-light">{{ desc }}</span>
    </div>
  </div>
</template>

<style>
.enc-vfe-feature-btn {
  @apply enc-flex enc-flex-col enc-items-center enc-justify-center;
  @apply enc-min-h-[40px] enc-py-[5px] enc-mb-[10px] enc-mx-[5px] enc-cursor-pointer enc-rounded-[4px];
  @apply enc-text-gray-500 enc-text-[14px] enc-bg-gray-100;
  &:hover {
    @apply enc-bg-gray-200;
  }
}
</style>
