<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { BaseFormItem, PopupFormItem } from '@cphayim-enc/base'

defineOptions({ name: 'EncPopupFormItem' })

const props = defineProps<{
  show: any
  item: PopupFormItem
}>()
const emit = defineEmits<{
  (e: 'update:show', value: any): void
  (e: 'click-overlay'): void
  (e: 'click-close'): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'opened'): void
  (e: 'closed'): void
}>()

const DEFAULT_OPTIONS: Omit<PopupFormItem, keyof BaseFormItem> = {
  closeOnClickOverlay: true,
  showToolbar: true,
  popupHeight: 'auto',
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _show = useVModel(props, 'show')

const popupStyle = computed(() => {
  const height = item.value.popupHeight
  return {
    height: typeof height === 'number' ? `${height}px` : height,
  }
})
</script>

<template>
  <van-popup
    v-model:show="_show"
    :close-on-click-overlay="item.closeOnClickOverlay"
    :style="popupStyle"
    position="bottom"
    round
    safe-area-inset-bottom
    @click-overlay="emit('click-overlay')"
    @click-close="emit('click-close')"
    @open="emit('open')"
    @close="emit('close')"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <slot
      v-bind="{ closeOnClickOverlay: item.closeOnClickOverlay, showToolbar: item.showToolbar }"
    />
  </van-popup>
</template>

<style scoped></style>
