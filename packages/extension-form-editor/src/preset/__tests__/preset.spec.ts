import { describe, expect, it } from 'vitest'

import type { FormItemUnion } from '@cphayim-enc/base'

import { FormEditorPreset } from '../../FormEditorPreset'
import { isPresetFeature } from '../../utils'
import { getPresetFeature } from '../preset'

function isFormItem(item: FormItemUnion): item is FormItemUnion {
  return ['name', 'label', 'type'].every((key) => Object.hasOwnProperty.call(item, key))
}

describe('preset', () => {
  it('should get preset feature', () => {
    for (const preset of Object.values(FormEditorPreset)) {
      const presetFeature = getPresetFeature(preset)
      expect(presetFeature).toBeTruthy()
      expect(isPresetFeature(presetFeature)).toBe(true)
      expect(presetFeature.presetName).toBe(preset)
    }
  })

  it('should get item by preset', () => {
    for (const preset of Object.values(FormEditorPreset)) {
      const presetFeature = getPresetFeature(preset)
      expect(isPresetFeature(presetFeature)).toBe(true)

      const item = presetFeature.getItem('test', 'Test')
      expect(isFormItem(item)).toBe(true)
      expect(item.name).toBe('test')
      expect(item.label).toBe('Test')
    }
  })
})
