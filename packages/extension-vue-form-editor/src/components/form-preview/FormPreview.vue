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
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})

const { formData, formItems } = useForm({}, toRef(props, 'items'))

const comp = computed(() => {
  if (props.encFormComponent?.name !== 'EncForm')
    throw Error(createErrorMessage('props encFormComponent must be a EncForm component'))
  return props.encFormComponent
})
</script>

<template>
  <component :is="comp" :data="formData" :items="formItems" />
</template>

<style></style>
