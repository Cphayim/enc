<script setup lang="ts">
import Controller from './Controller.vue'
</script>

<template>
  <div class="flex p-[20px]">
    <div class="flex-1 flex flex-col items-center">
      <div class="mb-[10px] text-green-400">@enc/vue-element-plus</div>
      <iframe src="/form/preview/element-plus" frameborder="0" class="flex-1 w-full" />
    </div>
    <div class="flex-shrink-0 flex flex-col items-center ml-[25px]">
      <div class="mb-[10px] text-green-400">@enc/vue-vant</div>
      <iframe src="/form/preview/vant" frameborder="0" class="w-[375px] h-[667px] shadow-lg" />
    </div>
  </div>

  <div>
    <Controller />
  </div>
</template>

<style scoped></style>
