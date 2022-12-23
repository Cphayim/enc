<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

import {
  createStringResultUploadTransformer,
  EncForm,
  FormItemUnion,
  useForm,
} from '@cphayim-enc/vue-element-plus'

import { FORM_ITEMS_STORE_KEY } from '../../constants'

// const formData = ref({
//   building: ['1F'],
// })
const oFormItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, [], {
  writeDefaults: false,
})

const { formData, formItems } = useForm(
  {
    building: ['1F'],
  },
  oFormItems,
  {
    defaultProps: {
      uploadTransformer: createStringResultUploadTransformer(','),
      uploadSend: async (file: File) => {
        return { name: Math.random().toString(), url: URL.createObjectURL(file) }
      },
    },
  },
)

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
