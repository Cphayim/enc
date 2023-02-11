import { FormEditorPreset, FormEditorPresetFeature } from './FormEditorPreset'

export function getPresetFeature(preset: FormEditorPreset): FormEditorPresetFeature {
  return presetFeatureMap[preset]
}

const presetFeatureMap: Record<FormEditorPreset, FormEditorPresetFeature> = {
  [FormEditorPreset.Input]: {
    presetName: FormEditorPreset.Input,
    presetLabel: '单行输入',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'input',
        inputType: 'text',
      }
    },
  },
  [FormEditorPreset.Textarea]: {
    presetName: FormEditorPreset.Textarea,
    presetLabel: '多行输入',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'input',
        inputType: 'textarea',
      }
    },
  },
  [FormEditorPreset.Number]: {
    presetName: FormEditorPreset.Number,
    presetLabel: '数字输入',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'input',
        inputType: 'number',
      }
    },
  },
  [FormEditorPreset.Password]: {
    presetName: FormEditorPreset.Password,
    presetLabel: '密码输入',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'input',
        inputType: 'password',
      }
    },
  },
  [FormEditorPreset.Select]: {
    presetName: FormEditorPreset.Select,
    presetLabel: '下拉选择',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'select',
      }
    },
  },
  [FormEditorPreset.Switch]: {
    presetName: FormEditorPreset.Switch,
    presetLabel: '开关',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'switch',
      }
    },
  },
  [FormEditorPreset.Radio]: {
    presetName: FormEditorPreset.Radio,
    presetLabel: '单选框',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'radio',
      }
    },
  },
  [FormEditorPreset.Checkbox]: {
    presetName: FormEditorPreset.Checkbox,
    presetLabel: '多选框',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'checkbox',
      }
    },
  },
  [FormEditorPreset.Date]: {
    presetName: FormEditorPreset.Date,
    presetLabel: '日期选择',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'date',
      }
    },
  },
  [FormEditorPreset.Time]: {
    presetName: FormEditorPreset.Time,
    presetLabel: '时间选择',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'time',
      }
    },
  },
  [FormEditorPreset.UploadImage]: {
    presetName: FormEditorPreset.UploadImage,
    presetLabel: '图片上传',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'upload',
        uploadType: 'image',
      }
    },
  },
  [FormEditorPreset.UploadFile]: {
    presetName: FormEditorPreset.UploadFile,
    presetLabel: '文件上传',
    getItem(name, label) {
      return {
        name,
        label,
        type: 'upload',
        uploadType: 'file',
      }
    },
  },
}
