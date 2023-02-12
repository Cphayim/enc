import type { FormItemUnion } from '@cphayim-enc/base'

/**
 * 表单编辑器预设
 */
export enum FormEditorPreset {
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
  // DateTime, // 日期时间选择
  UploadImage = 'uploadImage', // 图片上传
  UploadFile = 'uploadFile', // 文件上传
}

/**
 * 表单编辑器预设功能
 */
export type FormEditorPresetFeature = {
  /**
   * 预设名称
   */
  presetName: FormEditorPreset
  /**
   * 预设显示名称
   */
  presetLabel: string
  /**
   * 获取 FormItem
   */
  getItem: <F extends string>(name: F, label: string) => FormItemUnion<F>
}
