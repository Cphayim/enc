<script setup lang="ts">
import { computed, toRef } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { createErrorMessage } from '@cphayim-enc/shared'
import { useForm } from '@cphayim-enc/vue'

defineOptions({ name: 'EncFormPreview' })

type Props = {
  /**
   * 表单编辑器中的 formItems 数组
   * @default []
   */
  items?: FormItemUnion[]
  /**
   * 预览用的 EncForm 组件
   */
  encFormComponent: any
  /**
   * 需要透传给预览用的 EncForm 组件的额外 props
   */
  encFormProps?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})

const { formData, formItems } = useForm({}, toRef(props, 'items'), {
  commonItem: {
    uploadSend: () => {
      throw Error('预览模式下无法上传')
    },
  },
})

const EncForm = computed(() => {
  if (props.encFormComponent?.name !== 'EncForm')
    throw Error(createErrorMessage('props encFormComponent must be a EncForm component'))
  return props.encFormComponent
})
</script>

<template>
  <component :is="EncForm" v-bind="props.encFormProps" :data="formData" :items="formItems" />
</template>

<style></style>
