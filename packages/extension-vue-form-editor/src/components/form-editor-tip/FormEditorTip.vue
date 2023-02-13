<script setup lang="ts">
defineOptions({ name: 'FormEditorTip' })

const props = defineProps<{ content: string }>()
</script>

<template>
  <pre class="enc-form-editor-tip">{{ props.content }}</pre>
</template>

<style>
.enc-form-editor-tip {
  @apply enc-px-[10px] enc-py-[5px] enc-rounded-[4px] enc-m-0 enc-mb-[15px];
  @apply enc-text-[14px] enc-text-green-700 enc-text-opacity-70 enc-bg-green-500 enc-bg-opacity-20;
}
</style>
