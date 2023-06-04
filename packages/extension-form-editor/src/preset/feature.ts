import type { BaseFormItem, FormItemUnion } from '@cphayim-enc/base'
import { deepClone, isFunction, isNone, isString } from '@cphayim-enc/shared'

/**
 * 表单编辑器预设
 *
 * 这不等同于 `FormItemUnion` 的 `type`
 */
export enum PresetName {
  // 此处定义的是表单编辑器中使用的功能类型，不和 FormItem 的 type 一一对应
  Input = 'input', // 单行输入
  Textarea = 'textarea', // 多行输入
  Number = 'number', // 数字输入
  Password = 'password', // 密码输入
  Select = 'select', // 下拉选择
  // Cascader = 'cascader', // 级联选择（可视化编辑器中禁用）
  Switch = 'switch', // 开关
  Radio = 'radio', // 单选框
  Checkbox = 'checkbox', // 多选框
  Date = 'date', // 日期选择
  Time = 'time', // 时间选择
  DateRange = 'dateRange', // 日期范围选择
  Rate = 'rate', // 评分
  // DateTime, // 日期时间选择
  UploadImage = 'uploadImage', // 图片上传
  UploadFile = 'uploadFile', // 文件上传
}

type GetPresetItemFn = <F extends string>(name: F, label?: string) => FormItemUnion<F>

/**
 * 预设表单编辑器功能
 */
export type PresetFormEditorFeature = {
  /**
   * 预设名称
   */
  presetName: PresetName
  /**
   * 预设显示名称
   */
  presetLabel: string
  /**
   * 预设描述
   */
  presetDesc?: string
  /**
   * 获取 FormItem 的函数，传入 `name` 和 `label`
   */
  getItem: GetPresetItemFn
}

/**
 * 获取预设 Feature
 */
export function getPresetFeature(preset: PresetName): PresetFormEditorFeature {
  return presetFeatureMap[preset]
}

const presetLabelMap: Record<PresetName, string> = {
  [PresetName.Input]: '单行输入',
  [PresetName.Textarea]: '多行输入',
  [PresetName.Number]: '数字输入',
  [PresetName.Password]: '密码输入',
  [PresetName.Select]: '下拉选择',
  [PresetName.Switch]: '开关',
  [PresetName.Radio]: '单选框',
  [PresetName.Checkbox]: '多选框',
  [PresetName.Date]: '日期选择',
  [PresetName.Time]: '时间选择',
  [PresetName.DateRange]: '日期范围选择',
  [PresetName.Rate]: '评分',
  [PresetName.UploadImage]: '图片上传',
  [PresetName.UploadFile]: '文件上传',
}

const presetFeatureMap: Record<PresetName, PresetFormEditorFeature> = {
  [PresetName.Input]: createFeature(PresetName.Input, {
    type: 'input',
    inputType: 'text',
  }),
  [PresetName.Textarea]: createFeature(PresetName.Textarea, {
    type: 'input',
    inputType: 'textarea',
  }),
  [PresetName.Number]: createFeature(PresetName.Number, {
    type: 'input',
    inputType: 'number',
  }),
  [PresetName.Password]: createFeature(PresetName.Password, {
    type: 'input',
    inputType: 'password',
  }),
  [PresetName.Select]: createFeature(PresetName.Select, {
    type: 'select',
  }),
  [PresetName.Switch]: createFeature(PresetName.Switch, {
    type: 'switch',
  }),
  [PresetName.Radio]: createFeature(PresetName.Radio, {
    type: 'radio',
  }),
  [PresetName.Checkbox]: createFeature(PresetName.Checkbox, {
    type: 'checkbox',
    checkboxType: 'single',
  }),
  [PresetName.Date]: createFeature(PresetName.Date, {
    type: 'date',
    dateType: 'date',
    dateFormat: 'YYYY-MM-DD',
  }),
  [PresetName.Time]: createFeature(PresetName.Time, {
    type: 'time',
    timeType: 'hour-minute',
  }),
  [PresetName.DateRange]: createFeature(PresetName.DateRange, {
    type: 'date',
    dateType: 'daterange',
    dateFormat: 'YYYY-MM-DD',
    dateRangeSeparator: '-',
  }),
  [PresetName.Rate]: createFeature(PresetName.Rate, {
    type: 'rate',
    rateMax: 5,
  }),
  [PresetName.UploadImage]: createFeature(PresetName.UploadImage, {
    type: 'upload',
    uploadType: 'image',
    uploadButtonText: '上传文件',
  }),
  [PresetName.UploadFile]: createFeature(PresetName.UploadFile, {
    type: 'upload',
    uploadType: 'file',
    uploadButtonText: '上传文件',
  }),
}

type SketchyFormItemUnion<T = FormItemUnion> = T extends BaseFormItem
  ? Omit<T, 'name' | 'label'>
  : never

const COMMON_ITEM: Omit<BaseFormItem, 'name' | 'label' | 'type'> = {
  col: 24,
}

export function createGetItem(
  preset: PresetName,
  item: SketchyFormItemUnion<FormItemUnion>,
): GetPresetItemFn {
  return (name, label = presetLabelMap[preset]) => ({
    ...deepClone(COMMON_ITEM),
    ...item,
    name,
    label,
  })
}

export function createFeature(
  preset: PresetName,
  item: SketchyFormItemUnion<FormItemUnion>,
): PresetFormEditorFeature {
  return {
    presetName: preset,
    presetLabel: presetLabelMap[preset],
    getItem: createGetItem(preset, item),
  }
}

export function isPresetFeature(feature: any): feature is PresetFormEditorFeature {
  return (
    !isNone(feature) &&
    isString(feature.presetName) &&
    isString(feature.presetLabel) &&
    isFunction(feature.getItem)
  )
}
