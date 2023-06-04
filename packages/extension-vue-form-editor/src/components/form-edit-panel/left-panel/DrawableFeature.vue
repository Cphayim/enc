<!-- 可拖动的预设/业务功能项 -->
<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useDrag } from '@ombro/dnd-vue'

import { BizFormHelper, FormItemUnion, useEventLock } from '@cphayim-enc/vue'
import {
  BizFormEditorFeature,
  PresetFormEditorFeature,
  isBizFeature,
  isPresetFeature,
} from '@cphayim-enc/extension-form-editor'
import { DnDTypes, type DragFeature } from '../dnd'
import type { FormEditorInternalEmitter } from '..'

defineOptions({ name: 'EncDrawableFeature' })

const props = defineProps<{
  items: FormItemUnion[]
  feature: PresetFormEditorFeature | BizFormEditorFeature
  emitter: FormEditorInternalEmitter
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

const disabled = computed(() => {
  if (!isBizFeature(feature.value)) return false

  // items 中是否已经存在该 bizName 的项
  const isExistCurrentBiz = !!BizFormHelper.filterBizFormItems(props.items, {
    bizClass: feature.value.bizClass,
  }).length

  return feature.value.bizSingleton ? isExistCurrentBiz : false
})

const handleAdd = useEventLock(() => {
  props.emitter.emit('add-item-by-feature', { feature: props.feature })
})
</script>

<template>
  <div :data-col-span="colSpan">
    <div @click="handleAdd" :ref="drag" class="enc-edit-panel-feature-btn" :disabled="disabled">
      <span>{{ label }}</span>
      <span v-if="desc" class="enc-text-[12px] enc-text-gray-500 enc-font-light">{{ desc }}</span>
      <span v-if="isBizFeature(feature) && feature.bizSingleton" class="enc-biz-singleton-feature">
        单
      </span>
    </div>
  </div>
</template>

<style>
.enc-edit-panel-feature-btn {
  @apply enc-relative enc-overflow-hidden;
  @apply enc-flex enc-flex-col enc-items-center enc-justify-center;
  @apply enc-min-h-[40px] enc-py-[5px] enc-mb-[10px] enc-mx-[5px] enc-cursor-pointer enc-rounded-[4px];
  @apply enc-text-gray-500 enc-text-[14px] enc-bg-gray-100;
  &:hover {
    @apply enc-bg-gray-200;
  }
  &[disabled='true'] {
    @apply enc-pointer-events-none;
    @apply enc-opacity-60 enc-cursor-not-allowed;
  }
}
.enc-biz-singleton-feature {
  @apply enc-absolute enc-top-1/2 enc-right-[5px] -enc-translate-y-1/2;
  @apply enc-flex enc-justify-center enc-items-center enc-opacity-50;
  @apply enc-w-[30px] enc-h-[30px] enc-border-2 enc-border-solid enc-border-gray-300 enc-rounded-full;
  @apply enc-text-[18px] enc-text-gray-400;
}
</style>
