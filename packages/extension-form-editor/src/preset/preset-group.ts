import { FormEditorPreset } from '../FormEditorPreset'
import { getPresetFeature } from './preset'

export const GROUP_NAMES = {
  INPUT_TYPE: '输入型控件',
  SELECT_TYPE: '选择型控件',
  UPLOAD_TYPE: '上传型控件',
}

/**
 * 获取在 presetSet 中启用的预设功能分组列表
 */
export function getPresetFeatureGroups(presetSet: Set<FormEditorPreset>) {
  return [
    {
      groupName: GROUP_NAMES.INPUT_TYPE,
      features: filterAndGetPresetFeature(presetSet, [
        FormEditorPreset.Input,
        FormEditorPreset.Textarea,
        FormEditorPreset.Number,
        FormEditorPreset.Password,
      ]),
    },
    {
      groupName: GROUP_NAMES.SELECT_TYPE,
      features: filterAndGetPresetFeature(presetSet, [
        FormEditorPreset.Select,
        FormEditorPreset.Switch,
        FormEditorPreset.Radio,
        FormEditorPreset.Checkbox,
        FormEditorPreset.Date,
        FormEditorPreset.Time,
        FormEditorPreset.DateRange,
        FormEditorPreset.Rate,
      ]),
    },
    {
      groupName: GROUP_NAMES.UPLOAD_TYPE,
      features: filterAndGetPresetFeature(presetSet, [
        FormEditorPreset.UploadImage,
        FormEditorPreset.UploadFile,
      ]),
    },
  ]
}

export function filterAndGetPresetFeature(
  presetSet: Set<FormEditorPreset>,
  includes: FormEditorPreset[],
) {
  return includes.filter((preset) => presetSet.has(preset)).map(getPresetFeature)
}
