import { describe, expect, it } from 'vitest'

import type { FormItemUnion } from '../../form'
import type { BizFormItemUnion, BizPlaceHolderExtra, BizRealExtra } from '../BizFormItemUnion'
import { BizFormHelper } from '../helper'

function createFormItem(extra: Partial<BizRealExtra & BizPlaceHolderExtra>): FormItemUnion {
  return {
    name: 'testField',
    type: 'input',
    label: '测试字段',
    extra,
  }
}

describe('BizFormHelper', () => {
  it('should be defined', () => {
    expect(BizFormHelper).toBeDefined()
  })

  it('should be able to correctly identify `BizFormItemUnion`', () => {
    expect(BizFormHelper.isBizFormItem(createFormItem({}))).toBe(false)
    // needs to include both `biz` and `bizName`
    expect(BizFormHelper.isBizFormItem(createFormItem({ biz: true }))).toBe(false)
    expect(BizFormHelper.isBizFormItem(createFormItem({ bizName: 'TestBiz' }))).toBe(false)
    expect(BizFormHelper.isBizFormItem(createFormItem({ biz: true, bizName: 'TestBiz' }))).toBe(
      true,
    )
  })

  it('should be able to correctly identify `BizFormItemUnion<BizPlaceHolderExtra>`', () => {
    // also needs to additionally include `bizLabel`
    expect(BizFormHelper.isBizFormItemPlaceholder(createFormItem({}))).toBe(false)
    expect(
      BizFormHelper.isBizFormItemPlaceholder(createFormItem({ biz: true, bizName: 'TestBiz' })),
    ).toBe(false)
    expect(
      BizFormHelper.isBizFormItemPlaceholder(
        createFormItem({ biz: true, bizName: 'TestBiz', bizLabel: 'BizPlaceholderLabel' }),
      ),
    ).toBe(true)
  })

  it('should be able to correctly identify `BizFormItemUnion<BizRealExtra>`', () => {
    // also needs to additionally include `bizField` and `bizKey`
    expect(BizFormHelper.isBizFormItemReal(createFormItem({}))).toBe(false)
    expect(BizFormHelper.isBizFormItemReal(createFormItem({ biz: true, bizName: 'TestBiz' }))).toBe(
      false,
    )
    expect(
      BizFormHelper.isBizFormItemReal(
        createFormItem({ biz: true, bizName: 'TestBiz', bizKey: 'bizKey' }),
      ),
    ).toBe(false)
    expect(
      BizFormHelper.isBizFormItemReal(
        createFormItem({ biz: true, bizName: 'TestBiz', bizField: 'bizField' }),
      ),
    ).toBe(false)
    expect(
      BizFormHelper.isBizFormItemReal(
        createFormItem({
          biz: true,
          bizName: 'TestBiz',
          bizKey: 'bizKey',
          bizField: 'bizField',
        }),
      ),
    ).toBe(true)
  })

  const items = [
    createFormItem({}), // FormItemUnion
    createFormItem({ biz: true, bizName: 'Biz1', bizLabel: 'Biz1Label' }), // BizFormItemUnion<BizPlaceholderExtra>
    createFormItem({ biz: true, bizName: 'Biz1', bizKey: 'Biz2Key', bizField: 'Biz2Field' }), // BizFormItemUnion<BizRealExtra>
    // BizFormItemUnion<BizPlaceholderExtra>
    createFormItem({ biz: true, bizName: 'Biz2', bizLabel: 'Biz2Label' }),
    // BizFormItemUnion<BizRealExtra>
    createFormItem({ biz: true, bizName: 'Biz2', bizKey: 'Biz2key1', bizField: 'Biz2Field1' }), // first group
    createFormItem({ biz: true, bizName: 'Biz2', bizKey: 'Biz2key1', bizField: 'Biz2Field2' }),
    createFormItem({ biz: true, bizName: 'Biz2', bizKey: 'Biz2key2', bizField: 'Biz2Field1' }), // second group
    createFormItem({ biz: true, bizName: 'Biz2', bizKey: 'Biz2key2', bizField: 'Biz2Field2' }),
  ] as const

  it('should be able to filter `BizFormItemUnion[]`', () => {
    // all `BizFormItemUnion`
    expect(BizFormHelper.filterBizFormItems(items)).toEqual(items.slice(1))
    // all matched `BizFormItemUnion`
    expect(BizFormHelper.filterBizFormItems(items, { bizName: 'Biz2' })).toEqual(items.slice(3))
    expect(
      BizFormHelper.filterBizFormItems(items, { bizName: 'Biz2', bizKey: 'Biz2key1' }),
    ).toEqual(items.slice(4, 6))
    expect(
      BizFormHelper.filterBizFormItems(items, { bizName: 'Biz2', bizField: 'Biz2Field1' }),
    ).toEqual([items[4], items[6]])
  })

  it('should be able to filter `BizFormItemUnion<BizPlaceHolderExtra>[]`', () => {
    // all `BizFormItemUnion<BizPlaceHolderExtra>`
    expect(BizFormHelper.filterBizFormItemsPlaceholder(items)).toEqual([items[1], items[3]])
    // all matched `BizFormItemUnion<BizPlaceHolderExtra>`
    expect(BizFormHelper.filterBizFormItemsPlaceholder(items, { bizName: 'Biz2' })).toEqual([
      items[3],
    ])
    expect(BizFormHelper.filterBizFormItemsPlaceholder(items, { bizLabel: 'Biz1Label' })).toEqual([
      items[1],
    ])

    // try to find the fields of `BizFormItemUnion<BizRealExtra>`, should not find any items
    expect(
      BizFormHelper.filterBizFormItemsPlaceholder(items, { bizName: 'Biz2', bizKey: 'Biz2key1' }),
    ).toEqual([])
  })

  it('should be able to filter `BizFormItemUnion<BizRealExtra>[]`', () => {
    // all `BizFormItemUnion<BizRealExtra>`
    expect(BizFormHelper.filterBizFormItemsReal(items)).toEqual([
      ...items.slice(2, 3),
      ...items.slice(4),
    ])
    // all matched `BizFormItemUnion<BizRealExtra>`
    expect(BizFormHelper.filterBizFormItemsReal(items, { bizName: 'Biz2' })).toEqual(items.slice(4))
    expect(
      BizFormHelper.filterBizFormItemsReal(items, { bizName: 'Biz2', bizField: 'Biz2Field1' }),
    ).toEqual([items[4], items[6]])

    // try to find the fields of `BizFormItemUnion<BizPlaceHolderExtra>`, should not find any items
    expect(
      BizFormHelper.filterBizFormItemsReal(items, {
        bizName: 'Biz1',
        bizLabel: 'Biz1Label',
      }),
    ).toEqual([])
  })
})

describe('BizFormHelper.findBizValuesMap', () => {
  const items: BizFormItemUnion<BizRealExtra>[] = [
    { name: 'name1', label: 'label1', type: 'input' },
    { name: 'name2', label: 'label2', type: 'input' },
    {
      name: 'name3',
      label: 'label3',
      type: 'input',
      extra: { biz: true, bizName: 'Biz1', bizKey: 'Biz1Key1', bizField: 'Biz1Field1' },
    },
    {
      name: 'name4',
      label: 'label4',
      type: 'input',
      extra: { biz: true, bizName: 'Biz1', bizKey: 'Biz1Key1', bizField: 'Biz1Field2' },
    },
    {
      name: 'name5',
      label: 'label5',
      type: 'input',
      extra: { biz: true, bizName: 'Biz1', bizKey: 'Biz1Key2', bizField: 'Biz1Field1' },
    },
    {
      name: 'name6',
      label: 'label6',
      type: 'input',
      extra: { biz: true, bizName: 'Biz1', bizKey: 'Biz1Key2', bizField: 'Biz1Field2' },
    },
    {
      name: 'name7',
      label: 'label7',
      type: 'input',
      extra: { biz: true, bizName: 'Biz2', bizKey: 'Biz2Key1', bizField: 'Biz2Field' },
    },
    {
      name: 'name8',
      label: 'label8',
      type: 'input',
      extra: { biz: true, bizName: 'Biz2', bizKey: 'Biz2Key2', bizField: 'Biz2Field' },
    },
  ]

  const data = {
    name1: 'value1',
    name2: 'value2',
    name3: 'value3',
    name4: 'value4',
    name5: 'value5',
    name6: 'value6',
    name7: 'value7',
    name8: 'value8',
  }

  it('should be able to find `BizValuesMap`', () => {
    const result1 = BizFormHelper.findBizValuesMap(data, items, 'Biz1', [
      'Biz1Field2',
      'Biz1Field1',
    ])
    expect(result1['Biz1Key1']).toBeDefined()
    expect(result1['Biz1Key2']).toBeDefined()
    expect(result1['Biz1Key1']).toEqual([data.name4, data.name3])
    expect(result1['Biz1Key2']).toEqual([data.name6, data.name5])
  })
})
