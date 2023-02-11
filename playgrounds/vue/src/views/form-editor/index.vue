<script setup lang="ts">
import { EncForm, FormItemUnion } from '@cphayim-enc/vue-element-plus'
import { EncFormEditor, type FormEditorConfig } from '@cphayim-enc/extension-vue-form-editor'

const formEditorConfig: FormEditorConfig = {
  mode: 'visual',
  encFormComponent: EncForm,
}

const initItems: FormItemUnion[] = [
  { name: 'name', label: '姓名', type: 'input', col: 12 },
  { name: 'age', label: '年龄', type: 'input', col: 12 },
]
</script>

<template>
  <div>
    <EncFormEditor :config="formEditorConfig" :initItems="initItems"></EncFormEditor>
  </div>
</template>

<style scoped></style>
