import { computed, isRef, ref, Ref, watchEffect } from 'vue'

import type { FormItemUnion, OmitPartialFormItem } from '@cphayim-enc/base'
import { createErrorMessage } from '@cphayim-enc/shared'

export function useFormItems<F = string>(
  items: FormItemUnion<F>[] | Ref<FormItemUnion<F>[]>,
  commonItem?: OmitPartialFormItem,
) {
  const formItems = ref([]) as Ref<FormItemUnion<F>[]>

  // 如果 items 是一个 Ref，则当外部 items 更新时，应该重新赋值 formItems
  watchEffect(() => {
    formItems.value = mergeItems(isRef(items) ? items.value : items, commonItem)
  })

  const formItemsMap = computed(() => getCacheMap(formItems.value))

  const getItem = (name: F) => formItemsMap.value.get(name)

  const updateItem = (name: F, updateItem: OmitPartialFormItem) => {
    const item = getItem(name)
    if (item) {
      Object.assign(item, updateItem)
    } else {
      throw new Error(createErrorMessage(`updateItem not found name: ${name}`))
    }
  }

  return {
    formItems,
    getItem,
    updateItem,
  }
}

function mergeItems<F>(
  items: FormItemUnion<F>[] = [],
  commonItem: OmitPartialFormItem = {},
): FormItemUnion<F>[] {
  return items.map((item) => ({ ...commonItem, ...item }))
}

function getCacheMap<F>(items: FormItemUnion<F>[]) {
  const map = new Map<F, FormItemUnion<F>>()
  items.forEach((item) => map.set(item.name, item))
  return map
}
