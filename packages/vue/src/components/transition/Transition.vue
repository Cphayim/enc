<script setup lang="ts">
import { Transition } from 'vue'

defineOptions({ name: 'EncTransition' })
</script>

<template>
  <Transition v-bind="$attrs">
    <slot />
  </Transition>
</template>

<style></style>
