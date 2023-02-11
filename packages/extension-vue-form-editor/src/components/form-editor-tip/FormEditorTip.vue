<script setup lang="ts">
defineOptions({ name: 'FormEditorTip' })

const props = defineProps<{ content: string }>()
</script>

<template>
  <pre class="enc-form-editor-tip">{{ props.content }}</pre>
</template>

<style>
.enc-form-editor-tip {
  @apply enc-p-[4px] enc-border-2 enc-border-dotted enc-border-green-700 enc-rounded-[4px] enc-m-0 enc-mx-[5px] enc-mb-[15px];
  @apply enc-text-[14px] enc-text-green-700 enc-bg-green-700 enc-bg-opacity-20;
}
</style>
