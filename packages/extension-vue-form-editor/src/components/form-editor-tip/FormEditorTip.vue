<script setup lang="ts">
defineOptions({ name: 'FormEditorTip' })

const props = defineProps<{ content: string | string[] }>()
</script>

<template>
  <div class="enc-form-editor-tip">
    <ul class="enc-list-disc enc-pl-[20px]">
      <li v-if="typeof props.content === 'string'">{{ props.content }}</li>
      <li v-else v-for="item in props.content" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style>
.enc-form-editor-tip {
  @apply enc-px-[10px] enc-py-[5px] enc-rounded-[8px] enc-m-0 enc-mb-[15px];
  @apply enc-text-[14px] enc-text-gray-900 enc-text-opacity-70 enc-bg-[#FFFBEC];
}
</style>
