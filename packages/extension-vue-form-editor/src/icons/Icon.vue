<script setup lang="ts">
import { computed } from 'vue'
import type { FormEditorIcon } from '.'

defineOptions({ name: 'EncFormEditorIcon' })

const props = defineProps<{
  name: FormEditorIcon
}>()
const fullName = computed(() => `#enc-icon-${props.name}`)
</script>

<template>
  <svg class="enc-form-editor-icon" aria-hidden="true">
    <use :xlink:href="fullName"></use>
  </svg>
</template>

<style>
.enc-form-editor-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
