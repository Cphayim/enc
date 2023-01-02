import { ref, computed, Ref, watchEffect, isRef } from 'vue'

import type { FormItemUnion, OmitPartialFormItem } from '@cphayim-enc/base'
import { createErrorMessage, deepClone } from '@cphayim-enc/shared'

export type UseFormOptions = {
  /**
   * 默认表单配置项，将和 items 的每一项合并
   */
  defaultProps?: OmitPartialFormItem
}

/**
 * 对等表单通用 useForm hooks
 *
 * UI package 可以进行扩展
 */
export function useForm<T extends Record<string, any>, F = Extract<keyof T, string>>(
  initData: T,
  items: FormItemUnion<F>[] | Ref<FormItemUnion<F>[]>,
  options: UseFormOptions = {},
) {
  // 表单数据 v-model:values
  const formData = ref<T>(getInitialData(initData))
  // 表单配置项 :items, 和 defaultProps 合并
  const formItems = ref([]) as Ref<FormItemUnion<F>[]>

  watchEffect(() => {
    formItems.value = mergeItems(isRef(items) ? items.value : items, options.defaultProps)
  })

  const cacheMap = computed(() => getCacheMap(formItems.value))

  const resetData = () => {
    formData.value = getInitialData(initData)
  }

  const getItem = (name: F) => cacheMap.value.get(name)

  const updateItem = (name: F, updateItem: OmitPartialFormItem) => {
    const item = getItem(name)
    if (item) {
      Object.assign(item, updateItem)
    } else {
      throw new Error(createErrorMessage(`updateItem not found name: ${name}`))
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
  return deepClone(originalData)
}

function mergeItems<F>(
  items: FormItemUnion<F>[] = [],
  defaultProps: OmitPartialFormItem = {},
): FormItemUnion<F>[] {
  return items.map((item) => ({ ...defaultProps, ...item }))
}

function getCacheMap<F>(items: FormItemUnion<F>[]) {
  const map = new Map<F, FormItemUnion<F>>()
  items.forEach((item) => map.set(item.name, item))
  return map
}
