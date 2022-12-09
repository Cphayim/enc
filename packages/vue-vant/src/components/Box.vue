<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'EncBox' })

const props = defineProps<{
  initCount: number
}>()
const count = ref(props.initCount ?? 0)
</script>

<template>
  <div class="w-[100px] h-[100px] text-blue-500">
    {{ count }}
  </div>
</template>

<style></style>
