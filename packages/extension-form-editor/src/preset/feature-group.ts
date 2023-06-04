import { PresetName, getPresetFeature, type PresetFormEditorFeature } from './feature'

/**
 * 表单编辑器预设功能分组
 */
export type PresetFormEditorFeatureGroup = {
  /**
   * 分组名称
   */
  groupName: string
  /**
   * 预设功能列表
   */
  features: PresetFormEditorFeature[]
}

export const GROUP_NAMES = {
  INPUT_TYPE: '输入型控件',
  SELECT_TYPE: '选择型控件',
  UPLOAD_TYPE: '上传型控件',
}

/**
 * 获取在 presetSet 中启用的预设功能分组列表
 */
export function getPresetFeatureGroups(presetSet: Set<PresetName>): PresetFormEditorFeatureGroup[] {
  return [
    {
      groupName: GROUP_NAMES.INPUT_TYPE,
      features: filterAndGetPresetFeature(presetSet, [
        PresetName.Input,
        PresetName.Textarea,
        PresetName.Number,
        PresetName.Password,
      ]),
    },
    {
      groupName: GROUP_NAMES.SELECT_TYPE,
      features: filterAndGetPresetFeature(presetSet, [
        PresetName.Select,
        PresetName.Switch,
        PresetName.Radio,
        PresetName.Checkbox,
        PresetName.Date,
        PresetName.Time,
        PresetName.DateRange,
        PresetName.Rate,
      ]),
    },
    {
      groupName: GROUP_NAMES.UPLOAD_TYPE,
      features: filterAndGetPresetFeature(presetSet, [
        PresetName.UploadImage,
        PresetName.UploadFile,
      ]),
    },
  ]
}

export function filterAndGetPresetFeature(presetSet: Set<PresetName>, includes: PresetName[]) {
  return includes.filter((preset) => presetSet.has(preset)).map(getPresetFeature)
}
