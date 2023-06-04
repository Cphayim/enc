/*
 * 业务表单项
 *
 * 一个业务表单项可能由一个或多个常规表单项组成
 * 例如 “ItemPrice” 业务项可能由三个常规项组成：“item”、“price”、“quantity”
 *
 * 因此我们需要两种描述业务表单项的状态
 * - `ShadowBiz`: 在表单编辑器当中描述一个业务表单项，例如 “报价业务表单项”，通常只出现在表单编辑器的 items 中
 * - `RealBiz`: `ShadowBiz` 对应的实际表单项，可能存在一到多个，例如 “物品”、“单价”、“数量”，通常出现在表单编辑器导出（由 `ShadowBiz` 转换）或手动编写的 items 中
 */
import type { FormItemUnion } from '../form'

interface BaseBiz {
  /**
   * 业务类名
   *
   * @description 用于描述一个 `BizFormItem` 所属种类的名称
   *
   * 建议格式为 PascalCase，例如 `ItemPrice`
   */
  bizClass: string
}

/**
 * 实际业务项
 *
 * - 实际使用或表单编辑器的产出物
 */
export interface RealBiz extends BaseBiz {
  bizType: 'real'
  /**
   * 业务符号名
   *
   * @description 用于描述一个 `BizFormItem` 是 `bizClass` 的哪个实例
   *
   * 你可以简单的认为它是 `bizClass` 对应的类的实例名称
   *
   * 由于一个业务项可能被使用多次，例如 “ItemPrice” 被使用了两次，生成了两组 “item”、“price”、“quantity”，
   * 我们需要依靠 `bizSymbol` 来得知哪三个是一组的
   *
   * 因此每次为 `bizClass` 生成一组 `BizFormItemUnion<RealBiz>` 时
   * - 确保它们有相同的 `bizSymbol`
   * - 但有别于其它同一 `bizClass` 生成的 `BizFormItemUnion<RealBiz>`
   */
  bizSymbol: string
  /**
   * 业务字段名
   *
   * - 当业务表单控件仅包含一个常规控件时，可以与 `bizClass` 相同，使用 camelCase
   * - 当业务表单控件包含多个常规控件时，应为表示常规控件在组中的名称
   */
  bizName: string
}

/**
 * 占位业务项
 *
 * - 表单编辑器内占位用
 */
export interface ShadowBiz extends BaseBiz {
  bizType: 'shadow'
  /**
   * 显示在表单编辑器上的 label 名称
   */
  bizLabel: string
}

export type BizFormItemUnion<
  T extends RealBiz | ShadowBiz = RealBiz | ShadowBiz,
  F = string,
  E = any,
> = FormItemUnion<F, E> & {
  biz: T
}

export class BizFormHelper {
  /**
   * 判断一个 `FormItemUnion` 是否是 `BizFormItemUnion`
   */
  static isBizFormItem(item: FormItemUnion): item is BizFormItemUnion {
    return BizFormHelper.isRealBizFormItem(item) || BizFormHelper.isShadowBizFormItem(item)
  }

  /**
   * 判断一个 `FormItemUnion` 是否是 `BizFormItemUnion<RealBiz>`
   */
  static isRealBizFormItem(item: FormItemUnion): item is BizFormItemUnion<RealBiz> {
    const biz = (item as any)?.biz as RealBiz
    return !!biz && biz.bizType === 'real' && !!biz.bizClass && !!biz.bizName && !!biz.bizSymbol
  }

  /**
   * 判断一个 `FormItemUnion` 是否是 `BizFormItemUnion<ShadowBiz>`
   */
  static isShadowBizFormItem(item: FormItemUnion): item is BizFormItemUnion<ShadowBiz> {
    const biz = (item as any)?.biz as ShadowBiz
    return !!biz && biz.bizType === 'shadow' && !!biz.bizClass && !!biz.bizLabel
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有匹配的 `BizFormItemUnion`
   */
  static filterBizFormItems(
    items: FormItemUnion[],
    matcher?: Partial<RealBiz | ShadowBiz>,
  ): BizFormItemUnion<RealBiz | ShadowBiz>[] {
    return BizFormHelper._matchingBizFormItems(items.filter(BizFormHelper.isBizFormItem), matcher)
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有所有匹配的 `BizFormItemUnion<RealBiz>`
   */
  static filterRealBizFormItems(
    items: FormItemUnion[],
    matcher?: Partial<RealBiz>,
  ): BizFormItemUnion<RealBiz>[] {
    return BizFormHelper._matchingBizFormItems(
      items.filter(BizFormHelper.isRealBizFormItem),
      matcher,
    )
  }

  /**
   * 从 `FormItemUnion[]` 中找到所有匹配的 `BizFormItemUnion<ShadowBiz>`
   */
  static filterShadowBizFormItems(
    items: FormItemUnion[],
    matcher?: Partial<ShadowBiz>,
  ): BizFormItemUnion<ShadowBiz>[] {
    return BizFormHelper._matchingBizFormItems(
      items.filter(BizFormHelper.isShadowBizFormItem),
      matcher,
    )
  }

  /**
   * 查找 `formData` 中的业务数据的值的分组，组名为 `bizKey`
   *
   * @deprecated 已弃用，请用 `BizFormAnalyzer` 类的 `getDataAnalysisTree()` 方法替代
   *
   * @param data 表单数据
   * @param items 表单项
   * @param bizClass 业务类名
   * @param bizNames 业务字段名数组，返回值将按照该数组的顺序排列
   * @returns
   */
  static findBizValuesMap(
    data: Record<string, any>,
    items: FormItemUnion[],
    bizClass: string,
    bizNames: string[],
  ): Record<string, any[]> {
    const bizItems = BizFormHelper.filterRealBizFormItems(items)
    const result: Record<string, any[]> = {}

    bizItems.forEach((item) => {
      const biz = item.biz
      if (biz.bizClass !== bizClass) return

      const list = result[biz.bizSymbol] ?? []

      bizNames.forEach((name, index) => {
        if (biz.bizName === name) {
          list[index] = data[item.name]
        }
      })
      result[biz.bizSymbol] = list
    })

    return result
  }

  /**
   * 找到所有匹配规则的 `BizFormItemUnion`
   * @param items
   * @param matcher
   * @returns
   */
  private static _matchingBizFormItems<T extends BizFormItemUnion>(
    items: T[],
    matcher?: Partial<RealBiz | ShadowBiz>,
  ): T[] {
    if (!matcher) return items
    return items.filter((item) =>
      Object.entries(matcher).every(([key, value]) => (item.biz as any)[key] === value),
    )
  }
}
