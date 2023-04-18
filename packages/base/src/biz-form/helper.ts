import type { FormItemUnion } from '../form'
import type { BizFormItemUnion, BizPlaceHolderExtra, BizRealExtra } from './BizFormItemUnion'

export class BizFormHelper {
  /**
   * 判断一个 `FormItemUnion` 是否是 `BizFormItemUnion`
   */
  static isBizFormItem(item: FormItemUnion): item is BizFormItemUnion {
    return !!item.extra?.biz
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
  static filterBizFormItems(items: FormItemUnion[]): BizFormItemUnion[] {
    return items.filter(BizFormHelper.isBizFormItem)
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有占位 `BizFormItemUnion`
   */
  static filterBizFormItemsPlaceholder(
    items: FormItemUnion[],
  ): BizFormItemUnion<BizPlaceHolderExtra>[] {
    return items.filter(BizFormHelper.isBizFormItemPlaceholder)
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有真实 `BizFormItemUnion`
   */
  static filterBizFormItemsReal(items: FormItemUnion[]): BizFormItemUnion<BizRealExtra>[] {
    return items.filter(BizFormHelper.isBizFormItemReal)
  }

  /**
   * 查找 `formData` 中的业务数据
   * @param data 表单数据
   * @param items 表单项
   * @param bizName 业务名称
   * @param bizFields 返回的 `bizValue` 数组，返回值将按照该数组的顺序排列
   * @returns
   */
  static findBizValuesMap(
    data: Record<string, any>,
    items: FormItemUnion[],
    bizName: string,
    bizFields: string[],
  ) {
    const bizItems = BizFormHelper.filterBizFormItemsReal(items)
    const map: Record<string, any[]> = {}

    bizItems.forEach((item) => {
      const extra = item.extra!
      if (extra.bizName !== bizName) return

      const list = map[extra.bizKey] ?? []

      bizFields.forEach((field, index) => {
        if (extra.bizField === field) {
          list[index] = data[item.name]
        }
      })
      map[extra.bizKey] = list
    })

    return map
  }
}
