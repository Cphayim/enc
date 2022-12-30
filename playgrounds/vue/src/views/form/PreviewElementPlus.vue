<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

import { EncForm, FormItemUnion, useForm } from '@cphayim-enc/vue-element-plus'

import { FORM_ITEMS_STORE_KEY } from '../../constants'

const oFormItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, [], {
  writeDefaults: false,
})

const { formData, formItems } = useForm(
  {
    building: ['B', '4'],
    birthday: '2020-01-01',
  },
  oFormItems,
  {
    defaultProps: {
      uploadSend: async (file: File) => {
        return { name: file.name, url: URL.createObjectURL(file) }
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
  console.log(JSON.parse(JSON.stringify(formData.value)))
})
</script>

<template>
  <EncForm v-model:data="formData" :items="formItems" size="default" />
</template>

<style></style>
