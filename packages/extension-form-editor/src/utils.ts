import { isNone } from '@cphayim-enc/shared'
import { isFunction, isObject, isString } from '@vue/shared'
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
    isString(feature.bizName) &&
    isString(feature.bizLabel) &&
    isObject(feature.bizTransform)
  )
}
