<!-- 可拖动的 FormItem -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { toRefs } from '@vueuse/core'
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from '@ombro/dnd-vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { useEventLock } from '@cphayim-enc/vue'

import { EncFormEditorIcon, FormEditorIcon } from '../../../icons'
import { DnDTypes, DragFeature, DragItem } from '../dnd'
import type { FormEditorInternalEmitter, FormEditorSelectedItem } from '..'

defineOptions({ name: 'EncDrawableFormItem' })

const props = defineProps<{
  item: FormItemUnion
  index: number
  emitter: FormEditorInternalEmitter
  selectedItem?: FormEditorSelectedItem
}>()

const [collect, drag] = useDrag({
  type: DnDTypes.Item,
  item: (): DragItem => {
    return { type: 'item', index: props.index }
  },
  collect: (monitor) => {
    return {
      isMoving: monitor.isDragging(),
    }
  },
})

const [dropCollect, drop] = useDrop<
  DragItem | DragFeature,
  void,
  { handlerId: string | symbol | null; isAdding: boolean }
>({
  accept: [DnDTypes.Item, DnDTypes.Feature],
  collect(monitor) {
    const item = monitor.getItem()
    return {
      handlerId: monitor.getHandlerId(),
      isAdding: item?.type !== 'feature' ? false : item.currentIndex === props.index,
    }
  },
  hover(item, monitor) {
    if (item.type === 'item') handleMoveItem(item, monitor)
    else handleAddItemByFeature(item)
  },
})

// 移动 FormItem
const handleMoveItem = (item: DragItem, monitor: DropTargetMonitor<DragItem>) => {
  if (!itemRef.value) return

  const dragIndex = item.index
  const hoverIndex = props.index
  // 不替换自身
  if (dragIndex === hoverIndex) return

  // Determine rectangle on screen
  const hoverBoundingRect = itemRef.value.getBoundingClientRect()

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

  // Determine mouse position
  const clientOffset = monitor.getClientOffset() as XYCoord

  // Get pixels to the top
  const hoverClientY = clientOffset.y - hoverBoundingRect.top

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

  // Dragging upwards
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

  props.emitter.emit('move-item', { oldIndex: dragIndex, newIndex: hoverIndex })

  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  item.index = hoverIndex
}

const handleAddItemByFeature = (item: DragFeature) => {
  if (!itemRef.value) return

  const hoverIndex = props.index

  if (item.currentIndex === hoverIndex) return

  props.emitter.emit('add-item-by-feature', {
    feature: item.feature,
    index: hoverIndex,
    oldIndex: item.currentIndex,
  })

  item.currentIndex = hoverIndex
}

const itemRef = ref<HTMLDivElement>()
const setRef = (el: HTMLDivElement) => {
  itemRef.value = drag(drop(el))
}

const isSelected = computed(() => {
  const { selectedItem } = props
  return selectedItem?.type === 'select' && selectedItem?.index === props.index
})
const { isMoving } = toRefs(collect)
// 添加有两种状态：
// 1. 通过拖拽添加
// 2. 通过点击添加（显示一小段时间的添加提示效果）
const isAdding = computed(() => {
  const { selectedItem } = props
  const selectedAdding = selectedItem?.type === 'adding' && selectedItem?.index === props.index
  return dropCollect.value.isAdding || selectedAdding
})

const isRemoving = computed(() => {
  const { selectedItem } = props
  return selectedItem?.type === 'removing' && selectedItem?.index === props.index
})

const handleSelectItem = useEventLock(() => {
  props.emitter.emit('select-item', { type: 'select', index: props.index, item: props.item })
})

const handleRemove = useEventLock(() => {
  props.emitter.emit('select-item', {
    type: 'removing',
    index: props.index,
    item: props.item,
    callback: () => {
      props.emitter.emit('remove-item', { index: props.index })
    },
  })
})
</script>

<template>
  <div :data-col-span="props.item.col ?? 24" class="enc-edit-panel-drawable-form-item-wrap">
    <div
      :class="[
        'enc-edit-panel-drawable-form-item',
        {
          'enc-edit-panel-selected': isSelected,
          'enc-edit-panel-moving': isMoving,
          'enc-edit-panel-adding': isAdding,
          'enc-edit-panel-removing': isRemoving,
        },
      ]"
      :data-handler-id="dropCollect.handlerId"
      :ref="(setRef as any)"
      @click.stop="handleSelectItem"
    >
      <span class="enc-flex-1 enc-truncate">{{ props.item.label }}</span>
      <span
        @click.stop="handleRemove"
        class="enc-flex enc-justify-center enc-items-center enc-text-[18px] hover:enc-text-red-500"
      >
        <EncFormEditorIcon :name="FormEditorIcon.Remove" />
      </span>
    </div>
  </div>
</template>

<style>
.enc-edit-panel-drawable-form-item-wrap {
  @apply enc-p-[5px];
}
.enc-edit-panel-drawable-form-item {
  @apply enc-flex;
  @apply enc-leading-[40px] enc-px-[10px] enc-border enc-border-solid enc-border-opacity-50 enc-rounded-[6px];
  @apply enc-text-[14px] enc-cursor-pointer;
  @apply enc-transition-all enc-duration-300;
  @apply enc-border-gray-300 enc-text-gray-500;
}
</style>
