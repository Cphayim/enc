import { describe, expect, it } from 'vitest'
import { CascaderFormItemOption, CascaderHelper } from '../cascader'

describe('CascaderHelper', () => {
  const cascaderOptions: CascaderFormItemOption[] = [
    {
      label: 'A',
      value: 'A',
      children: [
        {
          label: '1F',
          value: 'A-1F',
          children: [
            { label: '101', value: 'A-1F-101' },
            { label: '102', value: 'A-1F-102' },
          ],
        },
        {
          label: '2F',
          value: 'A-2F',
          children: [
            { label: '201', value: 'A-2F-201' },
            { label: '202', value: 'A-2F-202' },
          ],
        },
      ],
    },
    {
      label: 'B',
      value: 'B',
      children: [
        {
          label: '1F',
          value: 'B-1F',
          children: [
            { label: '101', value: 'B-1F-101' },
            { label: '102', value: 'B-1F-102' },
          ],
        },
        {
          label: '2F',
          value: 'B-2F',
          children: [
            { label: '201', value: 'B-2F-201' },
            { label: '202', value: 'B-2F-202' },
          ],
        },
      ],
    },
  ]

  it('should able to find all option paths by value', () => {
    // empty value
    expect(CascaderHelper.getOptionsPathByValue(cascaderOptions, undefined)).toEqual([])
    // invalid value
    expect(CascaderHelper.getOptionsPathByValue(cascaderOptions, 'A-1F-201')).toEqual([])

    // leaf node
    expect(CascaderHelper.getOptionsPathByValue(cascaderOptions, 'A-1F-101')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'A', value: 'A' }),
        expect.objectContaining({ label: '1F', value: 'A-1F' }),
        expect.objectContaining({ label: '101', value: 'A-1F-101' }),
      ]),
    )
    expect(CascaderHelper.getOptionsPathByValue(cascaderOptions, 'B-2F-202')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'B', value: 'B' }),
        expect.objectContaining({ label: '2F', value: 'B-2F' }),
        expect.objectContaining({ label: '202', value: 'B-2F-202' }),
      ]),
    )

    // middle node
    expect(CascaderHelper.getOptionsPathByValue(cascaderOptions, 'A-1F')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'A', value: 'A' }),
        expect.objectContaining({ label: '1F', value: 'A-1F' }),
      ]),
    )
    expect(CascaderHelper.getOptionsPathByValue(cascaderOptions, 'B-2F')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'B', value: 'B' }),
        expect.objectContaining({ label: '2F', value: 'B-2F' }),
      ]),
    )
  })
})
