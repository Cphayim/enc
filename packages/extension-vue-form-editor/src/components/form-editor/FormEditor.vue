<script setup lang="ts">
import type { FormEditorConfig } from '../props'

defineOptions({ name: 'EncFormEditor' })

type Props = {
  config?: FormEditorConfig
}
const props = defineProps<Props>()
</script>

<template>
  <div></div>
</template>

<style></style>
