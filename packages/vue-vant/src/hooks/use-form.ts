import { type Ref, ref } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { useForm as _useForm, type UseFormOptions } from '@cphayim-enc/vue'
import type { EncFormInstanceType } from '../components'

type EncFormInstance = EncFormInstanceType | undefined

/**
 * 对等表单 useForm hooks
 */
export function useForm<T extends Record<string, any>, F = Extract<keyof T, string>>(
  initData: T,
  items: FormItemUnion<F>[] | Ref<FormItemUnion<F>[]>,
  options?: UseFormOptions,
) {
  const formRef = ref<EncFormInstance>()
  const setFormRef = (instance: EncFormInstance) => {
    formRef.value = instance
  }

  return {
    ..._useForm(initData, items, options),
    formRef,
    setFormRef,
  }
}
