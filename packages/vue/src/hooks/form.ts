import { ref, computed, Ref, unref, isRef, watchEffect } from 'vue'

import type { FormItemUnion, OmitTypeFormItem } from '@cphayim-enc/base'
import { deepClone, IsNotEmptyObject } from '@cphayim-enc/shared'

export type UseFormOptions = {
  defaultProps?: OmitTypeFormItem
}

/**
 * 对等表单通用 useForm hooks
 *
 * UI package 可以进行扩展
 */
export function useForm<
  T extends Record<string, any>,
  U = IsNotEmptyObject<T> extends false ? keyof T : string,
>(
  originalData: T | Ref<T>,
  items: FormItemUnion<U>[] | Ref<FormItemUnion<U>[]>,
  options: UseFormOptions = {},
) {
  // 表单数据 v-model:values
  const formData: Ref<T> = ref(getInitialData(originalData) as any)
  // 表单配置项 :items, 和 defaultProps 合并
  const formItems: Ref<FormItemUnion<U>[]> = ref([])

  if (isRef(items)) {
    watchEffect(() => {
      formItems.value = mergeItems(items.value, options.defaultProps)
    })
  } else {
    formItems.value = mergeItems(items, options.defaultProps)
  }

  const cacheMap = computed(() => getCacheMap(formItems.value))

  const resetData = () => {
    formData.value = getInitialData(originalData) as any
  }

  const getItem = (name: U) => cacheMap.value.get(name) as FormItemUnion<U>

  const updateItem = (name: U, updateItem: OmitTypeFormItem) => {
    const item = getItem(name)
    if (item) {
      Object.assign(item, updateItem)
    }
  }

  return {
    formData,
    formItems,
    resetData,
    getItem,
    updateItem,
  }
}

function getInitialData<T>(originalData: T) {
  return deepClone(unref(originalData))
}

function mergeItems<U>(
  items: FormItemUnion<U>[] = [],
  defaultProps: OmitTypeFormItem = {},
): FormItemUnion<U>[] {
  return items.map((item) => {
    const merged = { ...defaultProps, ...item }
    // if (merged.rules) {
    //   merged.rules = merged.rules.map((rule) => ({
    //     ...rule,
    //     trigger: 'onBlur',
    //   }))
    // }
    return merged
  })
}

function getCacheMap<U>(items: FormItemUnion<U>[]) {
  const m: Map<U, FormItemUnion<U>> = new Map()
  items.forEach((item) => {
    m.set(item.name as U, item as FormItemUnion<U>)
  })
  return m
}
