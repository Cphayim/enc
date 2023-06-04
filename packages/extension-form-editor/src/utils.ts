import { ENC_VERSION, FormItemUnion } from '@cphayim-enc/base'
import { isFunction, isNone, isObject, isString } from '@cphayim-enc/shared'

import type { FormEditorBizFeature } from './FormEditorBiz'
import type { FormEditorPresetFeature } from './FormEditorPreset'

export function isPresetFeature(feature: any): feature is FormEditorPresetFeature {
  return (
    !isNone(feature) &&
    isString(feature.presetName) &&
    isString(feature.presetLabel) &&
    isFunction(feature.getItem)
  )
}

export function isBizFeature(feature: any): feature is FormEditorBizFeature {
  return (
    !isNone(feature) &&
    isString(feature.bizClass) &&
    isString(feature.bizLabel) &&
    isObject(feature.bizTransformer)
  )
}

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
