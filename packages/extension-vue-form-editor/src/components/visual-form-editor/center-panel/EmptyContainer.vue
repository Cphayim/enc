<script setup lang="ts">
import { computed } from 'vue'
import { useDrop } from 'vue3-dnd'

import type { VisualFormEditorInternalEmitter } from '..'
import { DnDTypes, DragFeature } from '../dnd'

defineOptions({ name: 'EncVisualFormEditorEmptyContainer' })

const props = defineProps<{
  emitter: VisualFormEditorInternalEmitter
  emptyText?: string
}>()

const DEFAULT_FORM_ITEM_EMPTY_TEXT = '暂无表单控件，从左边点击/拖放一个吧'
const emptyText = computed(() => props.emptyText ?? DEFAULT_FORM_ITEM_EMPTY_TEXT)

const [dropCollect, drop] = useDrop<DragFeature, void, { isAdding: boolean }>({
  accept: [DnDTypes.Feature],
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
      isAdding: monitor.isOver(),
    }
  },
  drop(item) {
    handleAddItemByFeature(item)
  },
})

const handleAddItemByFeature = (item: DragFeature) => {
  props.emitter.emit('add-item-by-feature', {
    feature: item.feature,
  })
}
</script>

<template>
  <div ref="drop" class="enc-form-editor-empty" :class="{ adding: dropCollect.isAdding }">
    <span>{{ emptyText }}</span>
  </div>
</template>

<style>
.enc-form-editor-empty {
  @apply enc-flex-1 enc-flex enc-flex-col enc-justify-center enc-items-center;
  @apply enc-py-[150px] enc-border-dashed enc-rounded-[10px];
  @apply enc-text-[14px];
  @apply enc-border-gray-300 enc-text-gray-400;
  &.adding {
    @apply enc-border-green-500 enc-text-green-500 enc-bg-green-500 enc-bg-opacity-20;
  }
}
</style>
