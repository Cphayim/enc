import { FormEditorConfig, FormEditorPreset } from '@cphayim-enc/extension-form-editor'

export const DEFAULT_FORM_EDITOR_CONFIG: FormEditorConfig = {
  // default enable all
  presets: Object.values(FormEditorPreset),
  bizFeatures: [],
  randomNameOnly: false,
  randomNameLength: 8,
}
