import type { BaseFormItem, FormItemUnion } from '@cphayim-enc/base'
import { deepClone } from '@cphayim-enc/shared'

import { FormEditorPreset, FormEditorPresetFeature } from '../FormEditorPreset'

type SketchyFormItemUnion<T = FormItemUnion> = T extends BaseFormItem
  ? Omit<T, 'name' | 'label'>
  : never

const COMMON_ITEM: Omit<BaseFormItem, 'name' | 'label' | 'type'> = {
  col: 24,
}

export function createGetItem(
  preset: FormEditorPreset,
  item: SketchyFormItemUnion<FormItemUnion>,
): FormEditorPresetFeature['getItem'] {
  return (name, label = presetLabelMap[preset]) => ({
    ...deepClone(COMMON_ITEM),
    ...item,
    name,
    label,
  })
}

export function createFeature(
  preset: FormEditorPreset,
  item: SketchyFormItemUnion<FormItemUnion>,
): FormEditorPresetFeature {
  return {
    presetName: preset,
    presetLabel: presetLabelMap[preset],
    getItem: createGetItem(preset, item),
  }
}

/**
 * 获取预设 Feature
 */
export function getPresetFeature(preset: FormEditorPreset): FormEditorPresetFeature {
  return presetFeatureMap[preset]
}

const presetLabelMap: Record<FormEditorPreset, string> = {
  [FormEditorPreset.Input]: '单行输入',
  [FormEditorPreset.Textarea]: '多行输入',
  [FormEditorPreset.Number]: '数字输入',
  [FormEditorPreset.Password]: '密码输入',
  [FormEditorPreset.Select]: '下拉选择',
  [FormEditorPreset.Switch]: '开关',
  [FormEditorPreset.Radio]: '单选框',
  [FormEditorPreset.Checkbox]: '多选框',
  [FormEditorPreset.Date]: '日期选择',
  [FormEditorPreset.Time]: '时间选择',
  [FormEditorPreset.DateRange]: '日期范围选择',
  [FormEditorPreset.Rate]: '评分',
  [FormEditorPreset.UploadImage]: '图片上传',
  [FormEditorPreset.UploadFile]: '文件上传',
}

const presetFeatureMap: Record<FormEditorPreset, FormEditorPresetFeature> = {
  [FormEditorPreset.Input]: createFeature(FormEditorPreset.Input, {
    type: 'input',
    inputType: 'text',
  }),
  [FormEditorPreset.Textarea]: createFeature(FormEditorPreset.Textarea, {
    type: 'input',
    inputType: 'textarea',
  }),
  [FormEditorPreset.Number]: createFeature(FormEditorPreset.Number, {
    type: 'input',
    inputType: 'number',
  }),
  [FormEditorPreset.Password]: createFeature(FormEditorPreset.Password, {
    type: 'input',
    inputType: 'password',
  }),
  [FormEditorPreset.Select]: createFeature(FormEditorPreset.Select, {
    type: 'select',
  }),
  [FormEditorPreset.Switch]: createFeature(FormEditorPreset.Switch, {
    type: 'switch',
  }),
  [FormEditorPreset.Radio]: createFeature(FormEditorPreset.Radio, {
    type: 'radio',
  }),
  [FormEditorPreset.Checkbox]: createFeature(FormEditorPreset.Checkbox, {
    type: 'checkbox',
    checkboxType: 'single',
  }),
  [FormEditorPreset.Date]: createFeature(FormEditorPreset.Date, {
    type: 'date',
    dateType: 'date',
    dateFormat: 'YYYY-MM-DD',
  }),
  [FormEditorPreset.Time]: createFeature(FormEditorPreset.Time, {
    type: 'time',
    timeType: 'hour-minute',
  }),
  [FormEditorPreset.DateRange]: createFeature(FormEditorPreset.DateRange, {
    type: 'date',
    dateType: 'daterange',
    dateFormat: 'YYYY-MM-DD',
    dateRangeSeparator: '-',
  }),
  [FormEditorPreset.Rate]: createFeature(FormEditorPreset.Rate, {
    type: 'rate',
    rateMax: 5,
  }),
  [FormEditorPreset.UploadImage]: createFeature(FormEditorPreset.UploadImage, {
    type: 'upload',
    uploadType: 'image',
    uploadButtonText: '上传文件',
  }),
  [FormEditorPreset.UploadFile]: createFeature(FormEditorPreset.UploadFile, {
    type: 'upload',
    uploadType: 'file',
    uploadButtonText: '上传文件',
  }),
}
