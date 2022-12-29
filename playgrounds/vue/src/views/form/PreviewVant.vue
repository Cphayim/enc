<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

import {
  defaultUploadTransformer,
  EncForm,
  FormItemUnion,
  ImageUtils,
  useForm,
} from '@cphayim-enc/vue-vant'

import { FORM_ITEMS_STORE_KEY } from '../../constants'

const oFormItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, [], {
  writeDefaults: false,
})

const { formData, formItems } = useForm(
  {
    building: ['B', '4'],
    birthday: '2020-01-01',
    photos: [
      {
        name: 'plant-1.png',
        url: 'https://element-plus.org/images/plant-1.png',
      },
    ],
  },
  oFormItems,
  {
    defaultProps: {
      uploadTransformer: defaultUploadTransformer,
      uploadSend: async (file: File) => {
        const url = await ImageUtils.getBase64ByFile(file)
        return { name: Math.random().toString(), url }
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
