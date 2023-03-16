import { describe, expect, it } from 'vitest'
import { FormEditorPreset } from '../../FormEditorPreset'

import { filterAndGetPresetFeature, getPresetFeatureGroups, GROUP_NAMES } from '../preset-group'

describe('preset-group', () => {
  it('should be get group name constant', () => {
    expect(GROUP_NAMES).toBeDefined()
    expect(GROUP_NAMES.INPUT_TYPE).toBeTypeOf('string')
    expect(GROUP_NAMES.SELECT_TYPE).toBeTypeOf('string')
    expect(GROUP_NAMES.UPLOAD_TYPE).toBeTypeOf('string')
  })

  it('should be able to filter and get preset feature', () => {
    const includes = [
      FormEditorPreset.Input,
      FormEditorPreset.Textarea,
      FormEditorPreset.Number,
      FormEditorPreset.Password,
    ]

    const features1 = filterAndGetPresetFeature(new Set(), includes)
    expect(Array.isArray(features1)).toBe(true)
    expect(features1.length).toBe(0)

    const features2 = filterAndGetPresetFeature(new Set(includes), includes)
    expect(Array.isArray(features2)).toBe(true)
    expect(features2.length).toBe(includes.length)

    const features3 = filterAndGetPresetFeature(
      new Set([FormEditorPreset.Input, FormEditorPreset.Textarea]),
      includes,
    )
    expect(Array.isArray(features3)).toBe(true)
    expect(features3.length).toBe(2)

    const features4 = filterAndGetPresetFeature(new Set([FormEditorPreset.Select]), includes)
    expect(Array.isArray(features4)).toBe(true)
    expect(features4.length).toBe(0)
  })

  it('should be able to get preset feature groups', () => {
    const groups = getPresetFeatureGroups(new Set())
    expect(Array.isArray(groups)).toBe(true)
    // 分组数量应该与 GROUP_NAMES 中的键数量一致
    expect(groups.length).toBe(Object.keys(GROUP_NAMES).length)
    for (const group of groups) {
      // 每个 group 都应该有 groupName 和 features
      expect(group).toBeDefined()
      expect(group.groupName).toBeTypeOf('string')
      expect(Array.isArray(group.features)).toBe(true)
      expect(group.features.length).toBe(0)
    }
  })

  it('should be able to get preset feature groups with preset set', () => {
    const groups = getPresetFeatureGroups(
      new Set([FormEditorPreset.Input, FormEditorPreset.Date, FormEditorPreset.Number]),
    )

    const inputGroup = groups.find((group) => group.groupName === GROUP_NAMES.INPUT_TYPE)!
    expect(inputGroup).toBeDefined()
    expect(inputGroup.features.length).toBe(2)
    expect(inputGroup.features[0].presetName).toBe(FormEditorPreset.Input)
    expect(inputGroup.features[1].presetName).toBe(FormEditorPreset.Number)

    const selectGroup = groups.find((group) => group.groupName === GROUP_NAMES.SELECT_TYPE)!
    expect(selectGroup).toBeDefined()
    expect(selectGroup.features.length).toBe(1)
    expect(selectGroup.features[0].presetName).toBe(FormEditorPreset.Date)
  })
})
