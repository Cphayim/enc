<script setup lang="ts">
defineOptions({ name: 'EncFieldset' })

const props = defineProps<{ title?: string }>()
</script>

<template>
  <fieldset
    class="enc-px-[10px] enc-pb-0 enc-border-solid enc-border enc-border-gray-300 enc-outline-none enc-rounded-[6px] enc-mb-[10px]"
  >
    <legend
      class="enc-flex enc-items-center enc-flex-nowrap enc-px-[8px] enc-text-[14px] enc-text-gray-500"
    >
      <slot name="title">{{ props.title }}</slot>
    </legend>
    <slot />
  </fieldset>
</template>

<style></style>
