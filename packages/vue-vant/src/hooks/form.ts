import { Ref, ref } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'
import { useForm as _useForm, UseFormOptions } from '@cphayim-enc/vue'
import type { IsNotEmptyObject } from '@cphayim-enc/shared'
import type { EncFormInstanceType } from '../components'

/**
 * 对等表单 useForm hooks
 */
export function useForm<
  T extends Record<string, any>,
  U = IsNotEmptyObject<T> extends false ? keyof T : string,
>(
  originalData: T | Ref<T>,
  items: FormItemUnion<U>[] | Ref<FormItemUnion<U>[]>,
  options: UseFormOptions = {},
) {
  const formRef: Ref<EncFormInstanceType | undefined> = ref()
  const setFormRef = (instance: EncFormInstanceType) => {
    formRef.value = instance
  }

  return {
    formRef,
    setFormRef,
    ..._useForm(originalData, items, options),
  }
}
