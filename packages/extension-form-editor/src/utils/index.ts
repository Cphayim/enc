import { ENC_VERSION, type FormItemUnion } from '@cphayim-enc/base'

/**
 * 为表单编辑器创建的 FormItemUnion 打标
 */
export function markItemCreatedByEditor(item: FormItemUnion): FormItemUnion {
  return {
    ...item,
    __CREATED_BY_ENC_FORM_EDITOR__: `v${ENC_VERSION}`,
  } as any
}

export function markItemsCreatedByEditor(items: FormItemUnion[]) {
  return items.map(markItemCreatedByEditor)
}
