import { FormEditorPreset } from '../FormEditorPreset'
import { getPresetFeature } from './preset'

export function getPresetFeatureGroups(presetSet: Set<FormEditorPreset>) {
  return [
    {
      groupName: '输入型控件',
      features: filterGetPresetFeature(presetSet, [
        FormEditorPreset.Input,
        FormEditorPreset.Textarea,
        FormEditorPreset.Number,
        FormEditorPreset.Password,
      ]),
    },
    {
      groupName: '选择型控件',
      features: filterGetPresetFeature(presetSet, [
        FormEditorPreset.Select,
        FormEditorPreset.Switch,
        FormEditorPreset.Radio,
        FormEditorPreset.Checkbox,
        FormEditorPreset.Date,
        FormEditorPreset.Time,
      ]),
    },
    {
      groupName: '上传型控件',
      features: filterGetPresetFeature(presetSet, [
        FormEditorPreset.UploadImage,
        FormEditorPreset.UploadFile,
      ]),
    },
  ]
}

export function filterGetPresetFeature(
  presetSet: Set<FormEditorPreset>,
  includes: FormEditorPreset[],
) {
  return includes.filter((preset) => presetSet.has(preset)).map(getPresetFeature)
}
