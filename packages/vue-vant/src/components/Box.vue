<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'EncBox' })

const props = defineProps<{
  initCount: number
}>()
const count = ref(props.initCount ?? 0)
</script>

<template>
  <div class="enc-w-[100px] enc-h-[100px] enc-text-blue-500">
    {{ count }}
  </div>
  <div class="a">
    <div class="b">b</div>
  </div>
</template>

<style>
.a {
  @apply enc-flex enc-justify-center enc-items-center;
  .b {
    @apply enc-bg-green-300;
  }
}
</style>
