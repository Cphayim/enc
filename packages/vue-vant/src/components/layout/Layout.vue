<script setup lang="ts">
defineOptions({ name: 'EncLayout' })
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped></style>
