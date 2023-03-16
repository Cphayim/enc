import { computed, onMounted, ref } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { createErrorMessage } from '@cphayim-enc/shared'
import { useFormItems } from '@cphayim-enc/vue'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

export function useEditorItems(items: FormItemUnion[], config: FormEditorConfig) {
  const EncForm = computed(() => {
    if (config.encFormComponent?.name !== 'EncForm')
      throw Error(createErrorMessage('props encFormComponent must be a EncForm component'))
    return config.encFormComponent
  })

  const formRef = ref<any>()
  // 立即执行一次验证，此处不抛出异常
  onMounted(() => {
    try {
      formRef.value?.validate?.()
    } catch (error) {}
  })

  return { EncForm, formRef, ...useFormItems(items) }
}
