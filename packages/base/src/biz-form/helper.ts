import type { FormItemUnion } from '../form'
import type { BizFormItemUnion, BizPlaceHolderExtra, BizRealExtra } from './BizFormItemUnion'

type FilterBizFormItemsMatchingRule = Partial<
  Omit<BizPlaceHolderExtra, 'biz'> & Omit<BizRealExtra, 'biz'>
>

export class BizFormHelper {
  /**
   * 判断一个 `FormItemUnion` 是否是 `BizFormItemUnion`
   */
  static isBizFormItem(item: FormItemUnion): item is BizFormItemUnion {
    return !!item.extra?.biz && !!item.extra?.bizName
  }

  /**
   * 判断一个 `FormItemUnion` 是否是占位 `BizFormItemUnion`
   */
  static isBizFormItemPlaceholder(
    item: FormItemUnion,
  ): item is BizFormItemUnion<BizPlaceHolderExtra> {
    return (
      BizFormHelper.isBizFormItem(item) &&
      !!(item as BizFormItemUnion<BizPlaceHolderExtra>).extra?.bizLabel
    )
  }

  /**
   * 判断一个 `FormItemUnion` 是否是真实 `BizFormItemUnion`
   */
  static isBizFormItemReal(item: FormItemUnion): item is BizFormItemUnion<BizRealExtra> {
    return (
      BizFormHelper.isBizFormItem(item) &&
      !!(item as BizFormItemUnion<BizRealExtra>).extra?.bizField &&
      !!(item as BizFormItemUnion<BizRealExtra>).extra?.bizKey
    )
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有 `BizFormItemUnion`
   */
  static filterBizFormItems(
    items: FormItemUnion[],
    matchingRule?: FilterBizFormItemsMatchingRule,
  ): BizFormItemUnion[] {
    return BizFormHelper._matchingBizFormItems(
      items.filter(BizFormHelper.isBizFormItem),
      matchingRule,
    )
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有占位 `BizFormItemUnion`
   */
  static filterBizFormItemsPlaceholder(
    items: FormItemUnion[],
    matchingRule?: FilterBizFormItemsMatchingRule,
  ): BizFormItemUnion<BizPlaceHolderExtra>[] {
    return BizFormHelper._matchingBizFormItems(
      items.filter(BizFormHelper.isBizFormItemPlaceholder),
      matchingRule,
    )
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有真实 `BizFormItemUnion`
   */
  static filterBizFormItemsReal(
    items: FormItemUnion[],
    matchingRule?: FilterBizFormItemsMatchingRule,
  ): BizFormItemUnion<BizRealExtra>[] {
    return BizFormHelper._matchingBizFormItems(
      items.filter(BizFormHelper.isBizFormItemReal),
      matchingRule,
    )
  }

  /**
   * 查找 `formData` 中的业务数据的值的分组，组名为 `bizKey`
   * @deprecated
   * @param data 表单数据
   * @param items 表单项
   * @param bizName 业务名称
   * @param bizFields 业务字段数组，返回值将按照该数组的顺序排列
   * @returns
   */
  static findBizValuesMap(
    data: Record<string, any>,
    items: FormItemUnion[],
    bizName: string,
    bizFields: string[],
  ): Record<string, any[]> {
    const bizItems = BizFormHelper.filterBizFormItemsReal(items)
    const result: Record<string, any[]> = {}

    bizItems.forEach((item) => {
      const extra = item.extra!
      if (extra.bizName !== bizName) return

      const list = result[extra.bizKey] ?? []

      bizFields.forEach((field, index) => {
        if (extra.bizField === field) {
          list[index] = data[item.name]
        }
      })
      result[extra.bizKey] = list
    })

    return result
  }

  /**
   * 找到所有匹配规则的 `BizFormItemUnion`
   * @param items
   * @param matchingRule
   * @returns
   */
  private static _matchingBizFormItems<T extends BizFormItemUnion>(
    items: T[],
    matchingRule?: FilterBizFormItemsMatchingRule,
  ): T[] {
    if (!matchingRule) return items
    return items.filter((item) =>
      Object.entries(matchingRule).every(([key, value]) => (item.extra as any)[key] === value),
    )
  }
}
