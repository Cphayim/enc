import { ref } from 'vue'

import { deepClone } from '@cphayim-enc/shared'

export function useFormData<T extends Record<string, any>>(initData: T) {
  const formData = ref<T>(getInitialData(initData))
  const resetData = () => {
    formData.value = getInitialData(initData)
  }

  return {
    formData,
    resetData,
  }
}

function getInitialData<T>(originalData: T) {
  return deepClone(originalData)
}
