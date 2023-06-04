import { describe, expect, it } from 'vitest'
import type { FormItemUnion } from '../../form'

import { BizFormHelper, BizFormItemUnion, RealBiz, ShadowBiz } from '../biz'

function createFormItem(biz: Partial<RealBiz | ShadowBiz>): any {
  return {
    name: 'testField',
    type: 'input',
    label: '测试字段',
    biz,
  }
}

describe('BizFormHelper', () => {
  it('should be defined', () => {
    expect(BizFormHelper).toBeDefined()
  })

  it('should be able to correctly identify `BizFormItemUnion<RealBiz>`', () => {
    // must exist `bizType: 'real'`, `bizClass`, `bizSymbol`, `bizName`
    expect(BizFormHelper.isRealBizFormItem(createFormItem({}))).toBe(false)
    expect(BizFormHelper.isRealBizFormItem(createFormItem({ bizType: 'real' }))).toBe(false)
    expect(
      BizFormHelper.isRealBizFormItem(createFormItem({ bizType: 'real', bizClass: 'TestBiz' })),
    ).toBe(false)
    expect(
      BizFormHelper.isRealBizFormItem(
        createFormItem({ bizType: 'real', bizClass: 'TestBiz', bizName: 'testBiz' }),
      ),
    ).toBe(false)
    expect(
      BizFormHelper.isRealBizFormItem(
        createFormItem({ bizType: 'real', bizClass: 'TestBiz', bizSymbol: 'symbol' }),
      ),
    ).toBe(false)
    expect(
      BizFormHelper.isRealBizFormItem(
        createFormItem({
          bizType: 'real',
          bizClass: 'TestBiz',
          bizSymbol: 'symbol',
          bizName: 'testBiz',
        }),
      ),
    ).toBe(true)

    expect(
      BizFormHelper.isShadowBizFormItem(
        // used `bizType: 'shadow'`
        createFormItem({
          bizType: 'shadow',
          bizClass: 'TestBiz',
          bizSymbol: 'symbol',
          bizName: 'testBiz',
        } as any),
      ),
    ).toBe(false)
  })

  it('should be able to correctly identify `BizFormItemUnion<ShadowBiz>`', () => {
    // must exist `bizType: 'shadow'`, `bizClass`, `bizLabel`
    expect(BizFormHelper.isShadowBizFormItem(createFormItem({}))).toBe(false)
    expect(BizFormHelper.isShadowBizFormItem(createFormItem({ bizType: 'real' }))).toBe(false)
    expect(
      BizFormHelper.isShadowBizFormItem(createFormItem({ bizType: 'shadow', bizClass: 'TestBiz' })),
    ).toBe(false)
    expect(
      BizFormHelper.isShadowBizFormItem(
        createFormItem({ bizType: 'shadow', bizLabel: 'ShadowBizLabel' }),
      ),
    ).toBe(false)
    expect(
      BizFormHelper.isShadowBizFormItem(
        createFormItem({ bizType: 'shadow', bizClass: 'TestBiz', bizLabel: 'ShadowBizLabel' }),
      ),
    ).toBe(true)

    expect(
      BizFormHelper.isShadowBizFormItem(
        // used `bizType: 'real'`
        createFormItem({ bizType: 'real', bizName: 'TestBiz', bizLabel: 'ShadowBizLabel' } as any),
      ),
    ).toBe(false)
  })

  it('should be able to correctly identify `BizFormItemUnion`', () => {
    expect(BizFormHelper.isBizFormItem(createFormItem({}))).toBe(false)
    expect(
      BizFormHelper.isRealBizFormItem(
        createFormItem({
          bizType: 'real',
          bizClass: 'TestBiz',
          bizSymbol: 'symbol',
          bizName: 'testBiz',
        }),
      ),
    ).toBe(true)
    expect(
      BizFormHelper.isShadowBizFormItem(
        createFormItem({ bizType: 'shadow', bizClass: 'TestBiz', bizLabel: 'ShadowBizLabel' }),
      ),
    ).toBe(true)
  })

  const items = [
    createFormItem({}), // FormItemUnion
    createFormItem({ bizType: 'shadow', bizClass: 'Biz1', bizLabel: 'Biz1Label' }), // BizFormItemUnion<ShadowBiz>
    createFormItem({
      bizType: 'real',
      bizClass: 'Biz1',
      bizSymbol: 'biz1Symbol1',
      bizName: 'biz1',
    }), // BizFormItemUnion<RealBiz>
    // BizFormItemUnion<ShadowBiz>
    createFormItem({ bizType: 'shadow', bizClass: 'Biz2', bizLabel: 'Biz2Label' }),
    // BizFormItemUnion<RealBiz>
    createFormItem({
      bizType: 'real',
      bizClass: 'Biz2',
      bizSymbol: 'Biz2Symbol1',
      bizName: 'biz2Field1',
    }), // first group
    createFormItem({
      bizType: 'real',
      bizClass: 'Biz2',
      bizSymbol: 'Biz2Symbol1',
      bizName: 'biz2Field2',
    }),
    createFormItem({
      bizType: 'real',
      bizClass: 'Biz2',
      bizSymbol: 'Biz2Symbol2',
      bizName: 'biz2Field1',
    }), // second group
    createFormItem({
      bizType: 'real',
      bizClass: 'Biz2',
      bizSymbol: 'Biz2Symbol2',
      bizName: 'biz2Field2',
    }),
  ]

  it('should be able to filter `BizFormItemUnion[]`', () => {
    // all `BizFormItemUnion`
    expect(BizFormHelper.filterBizFormItems(items)).toEqual(items.slice(1))
    // all matched `BizFormItemUnion`
    expect(BizFormHelper.filterBizFormItems(items, { bizClass: 'Biz2' })).toEqual(items.slice(3))
    expect(
      BizFormHelper.filterBizFormItems(items, { bizClass: 'Biz2', bizSymbol: 'Biz2Symbol1' }),
    ).toEqual(items.slice(4, 6))
    expect(
      BizFormHelper.filterBizFormItems(items, { bizClass: 'Biz2', bizName: 'biz2Field1' }),
    ).toEqual([items[4], items[6]])
  })

  it('should be able to filter `BizFormItemUnion<ShadowBiz>[]`', () => {
    // all `BizFormItemUnion<ShadowBiz>`
    expect(BizFormHelper.filterShadowBizFormItems(items)).toEqual([items[1], items[3]])
    // all matched `BizFormItemUnion<ShadowBiz>`
    expect(BizFormHelper.filterShadowBizFormItems(items, { bizClass: 'Biz2' })).toEqual([items[3]])
    expect(BizFormHelper.filterShadowBizFormItems(items, { bizLabel: 'Biz1Label' })).toEqual([
      items[1],
    ])
  })

  it('should be able to filter `BizFormItemUnion<RealBiz>[]`', () => {
    // all `BizFormItemUnion<RealBiz>`
    expect(BizFormHelper.filterRealBizFormItems(items)).toEqual([
      ...items.slice(2, 3),
      ...items.slice(4),
    ])
    // all matched `BizFormItemUnion<RealBiz>`
    expect(BizFormHelper.filterRealBizFormItems(items, { bizClass: 'Biz2' })).toEqual(
      items.slice(4),
    )
    expect(
      BizFormHelper.filterRealBizFormItems(items, { bizClass: 'Biz2', bizName: 'biz2Field1' }),
    ).toEqual([items[4], items[6]])
  })
})

describe('BizFormHelper.findBizValuesMap', () => {
  const items: (FormItemUnion | BizFormItemUnion<RealBiz>)[] = [
    { name: 'name1', label: 'label1', type: 'input' },
    { name: 'name2', label: 'label2', type: 'input' },
    {
      name: 'name3',
      label: 'label3',
      type: 'input',
      biz: { bizType: 'real', bizClass: 'Biz1', bizSymbol: 'Biz1Key1', bizName: 'Biz1Field1' },
    },
    {
      name: 'name4',
      label: 'label4',
      type: 'input',
      biz: { bizType: 'real', bizClass: 'Biz1', bizSymbol: 'Biz1Key1', bizName: 'Biz1Field2' },
    },
    {
      name: 'name5',
      label: 'label5',
      type: 'input',
      biz: { bizType: 'real', bizClass: 'Biz1', bizSymbol: 'Biz1Key2', bizName: 'Biz1Field1' },
    },
    {
      name: 'name6',
      label: 'label6',
      type: 'input',
      biz: { bizType: 'real', bizClass: 'Biz1', bizSymbol: 'Biz1Key2', bizName: 'Biz1Field2' },
    },
    {
      name: 'name7',
      label: 'label7',
      type: 'input',
      biz: { bizType: 'real', bizClass: 'Biz2', bizSymbol: 'Biz2Key1', bizName: 'Biz2Field' },
    },
    {
      name: 'name8',
      label: 'label8',
      type: 'input',
      biz: { bizType: 'real', bizClass: 'Biz2', bizSymbol: 'Biz2Key2', bizName: 'Biz2Field' },
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
