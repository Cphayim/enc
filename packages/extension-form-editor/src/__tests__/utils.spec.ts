import { describe, expect, it } from 'vitest'
import { isBizFeature, isPresetFeature } from '../utils'

describe('utils', () => {
  it('should be able to determine whether it is a PresetFeature', () => {
    expect(isPresetFeature(undefined)).toBe(false)
    expect(isPresetFeature(1)).toBe(false)
    expect(isPresetFeature({})).toBe(false)
    expect(isPresetFeature({ presetName: 1, presetLabel: '1' })).toBe(false)
    expect(isPresetFeature({ presetName: 1, presetLabel: '1', getItem: () => void 0 })).toBe(false)
    expect(isPresetFeature({ presetName: '1', presetLabel: '1', getItem: () => void 0 })).toBe(true)
  })

  it('should be able to determine whether it is a BizFeature', () => {
    expect(isBizFeature(undefined)).toBe(false)
    expect(isBizFeature(1)).toBe(false)
    expect(isBizFeature({})).toBe(false)
    expect(isBizFeature({ bizName: 1, bizLabel: '1' })).toBe(false)
    expect(isBizFeature({ bizName: 1, bizLabel: '1', bizTransformer: {} })).toBe(false)
    expect(isBizFeature({ bizName: '1', bizLabel: '1', bizTransformer: {} })).toBe(true)
  })
})
