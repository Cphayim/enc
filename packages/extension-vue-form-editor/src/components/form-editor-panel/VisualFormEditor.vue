<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { HTML5Backend } from '@ombro/dnd-backend'
import { DndProvider } from '@ombro/dnd-vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { isNone, randomStr } from '@cphayim-enc/shared'
import { useEmitter } from '@cphayim-enc/vue'
import { FormEditorConfig, isPresetFeature } from '@cphayim-enc/extension-form-editor'

import type { VisualFormEditorInternalEvents, VisualFormEditorSelectedItem } from '.'
import { EncVisualFormEditorLeftPanel } from './left-panel'
import { EncVisualFormEditorCenterPanel } from './center-panel'
import { EncVisualFormEditorRightPanel } from './right-panel'

defineOptions({ name: 'EncVisualFormEditor' })

type Props = {
  /**
   * 表单编辑器中的 formItems 数组
   * @default []
   */
  items: FormItemUnion[]
  /**
   * 表单编辑器配置项
   */
  config: FormEditorConfig
  /**
   * dnd backend
   * @default HTML5Backend
   */
  backend?: any
}

const props = defineProps<Props>()
const emit = defineEmits<(e: 'update:items', v: FormItemUnion[]) => void>()

const formItems = useVModel(props, 'items', emit)

const config = computed(() => props.config)

// 内部发布/订阅器
const emitter = useEmitter<VisualFormEditorInternalEvents>()

const handleAddItem = ({ item, index }: VisualFormEditorInternalEvents['add-item']) => {
  formItems.value.splice(index, 0, item)
}
const handleRemoveItem = ({ index }: VisualFormEditorInternalEvents['remove-item']) => {
  // 删除时移除选中状态
  emitter.emit('select-item', { type: 'unselect' })
  formItems.value.splice(index, 1)
}
const handleMoveItem = ({ oldIndex, newIndex }: VisualFormEditorInternalEvents['move-item']) => {
  const dragItem = formItems.value[oldIndex]
  handleRemoveItem({ index: oldIndex })
  handleAddItem({ index: newIndex, item: dragItem })
}

const handleAddItemByFeature = ({
  oldIndex,
  index,
  feature,
}: VisualFormEditorInternalEvents['add-item-by-feature']) => {
  if (!isNone(oldIndex)) handleRemoveItem({ index: oldIndex })

  // 直接点击左侧面板的功能按钮触发不存在 index，添加到尾部
  if (isNone(index)) index = formItems.value.length
  const rStr = randomStr(config.value.randomNameLength ?? 8)
  const item = isPresetFeature(feature)
    ? feature.getItem(rStr)
    : feature.bizTransformer.toPlaceHolder([], rStr)
  handleAddItem({ index, item })
  emitter.emit('select-item', { type: 'adding', item, index })
}

emitter.on('add-item', handleAddItem)
emitter.on('remove-item', handleRemoveItem)
emitter.on('move-item', handleMoveItem)
emitter.on('add-item-by-feature', handleAddItemByFeature)

const selectedItem = ref<VisualFormEditorSelectedItem>()
emitter.on('select-item', (payload) => {
  if (payload.type === 'unselect') {
    selectedItem.value = undefined
  } else {
    selectedItem.value = payload
    if (payload.type === 'adding' || payload.type === 'removing') {
      setTimeout(() => {
        selectedItem.value = undefined
        payload.callback?.()
      }, 300)
    }
  }
})

watch(
  selectedItem,
  (selectedItem) => {
    if (selectedItem) {
      formItems.value[selectedItem.index] = selectedItem.item
    }
  },
  { deep: true },
)
</script>

<template>
  <DndProvider :backend="props.backend || HTML5Backend">
    <div class="enc-vfe">
      <!-- left features panel -->
      <EncVisualFormEditorLeftPanel :config="config" :emitter="emitter" class="enc-flex-shrink-0" />
      <!-- center items panel -->
      <EncVisualFormEditorCenterPanel
        v-model:items="formItems"
        :config="config"
        :emitter="emitter"
        :selectedItem="selectedItem"
        class="enc-flex-1"
      />
      <!-- right detail edit panel -->
      <EncVisualFormEditorRightPanel
        :config="config"
        v-model:selectedItem="selectedItem"
        class="enc-flex-shrink-0"
      />
    </div>
  </DndProvider>
</template>

<style>
.enc-vfe {
  @apply enc-flex enc-min-h-[800px];
  &-selected {
    @apply enc-border-blue-500 enc-text-blue-500 enc-bg-blue-500 enc-bg-opacity-20;
  }
  &-moving {
    @apply enc-border-yellow-500 enc-text-yellow-500 enc-bg-yellow-500 enc-bg-opacity-20;
  }
  &-adding {
    @apply enc-border-green-500 enc-text-green-500 enc-bg-green-500 enc-bg-opacity-20;
  }
  &-removing {
    @apply enc-border-red-500 enc-text-red-500 enc-bg-red-500 enc-bg-opacity-20;
  }
}
</style>
