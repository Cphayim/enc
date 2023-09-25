<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

import { EncLayout, EncForm, type FormItemUnion, useForm } from '@cphayim-enc/vue-vant'

import { FORM_ITEMS_STORE_KEY } from '../../constants'

const oFormItems = useLocalStorage<FormItemUnion[]>(FORM_ITEMS_STORE_KEY, [], {
  writeDefaults: false,
})

const { formData, formItems } = useForm(
  {
    building: ['B', '4'],
    birthday: '2020-01-01',
    // photos: [
    //   {
    //     name: 'plant-1.png',
    //     url: 'https://element-plus.org/images/plant-1.png',
    //   },
    // ],
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
    console.log(formItems.value)
  }
})
watchEffect(() => {
  console.log(JSON.parse(JSON.stringify(formData.value)))
})

const handleBack = () => {
  //
}
</script>

<template>
  <EncLayout title="EncForm" back-arrow :on-back="handleBack">
    <EncForm v-model:data="formData" :items="formItems" size="default" />
  </EncLayout>
</template>

<style></style>
