import { describe, expect, it } from 'vitest'
import { isBizFeature } from '../feature'

describe('utils', () => {
  it('should be able to determine whether it is a BizFormEditorFeature', () => {
    expect(isBizFeature(undefined)).toBe(false)
    expect(isBizFeature(1)).toBe(false)
    expect(isBizFeature({})).toBe(false)
    expect(isBizFeature({ bizClass: 1, bizLabel: '1' })).toBe(false)
    expect(isBizFeature({ bizClass: 1, bizLabel: '1', bizTransformer: {} })).toBe(false)
    expect(isBizFeature({ bizClass: '1', bizLabel: '1', bizTransformer: {} })).toBe(true)
  })
})
