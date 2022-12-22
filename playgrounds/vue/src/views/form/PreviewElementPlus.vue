<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

import { EncForm, FormItemUnion } from '@cphayim-enc/vue-element-plus'

import { FORM_ITEMS_STORE_KEY } from '../../constants'

const formData = ref({
  building: ['1F'],
})
const formItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, [], {
  writeDefaults: false,
})
watchEffect(() => {
  if (formItems.value) {
    console.log('PreviewElementPlus: formItems changed')
  }
})
watchEffect(() => {
  console.log(formData.value)
})
</script>

<template>
  <EncForm v-model:data="formData" :items="formItems" size="default" />
</template>

<style></style>
