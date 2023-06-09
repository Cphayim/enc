import {
  type BizFormItemUnion,
  type FormItemUnion,
  BizFormHelper,
  type RealBiz,
  type ShadowBiz,
  type BizTransformer,
} from '@cphayim-enc/base'
import { createErrorMessage, randomStr } from '@cphayim-enc/shared'

import type { BizFormEditorFeature } from './feature'

export class BizFormEditorTransformer {
  private static RANDOM_STR_LENGTH = 6

  /**
   * 把一组 `FormItemUnion` 中所有的 `BizFormItemUnion<RealBiz>` 转换为对应的 `BizFormItemUnion<ShadowBiz>`
   *
   * (FormItemUnion | BizFormItemUnion<RealBiz>)[] -> (FormItemUnion | BizFormItemUnion<ShadowBiz>)[]
   */
  static batchToShadow(
    items: (FormItemUnion | BizFormItemUnion<RealBiz>)[],
    bizFeatures: BizFormEditorFeature[],
  ): (FormItemUnion | BizFormItemUnion<ShadowBiz>)[] {
    // 有的 `BizFormItemUnion<ShadowBiz>` 可能是多个 `BizFormItemUnion<RealBiz>`，先进行去重
    // 根据 `RealBiz.bizSymbol` 实例标记去重
    const uniqueItems = deduplicate(items)

    const transformedItems: (FormItemUnion | BizFormItemUnion<ShadowBiz>)[] = []

    uniqueItems.forEach((item) => {
      if (!BizFormHelper.isRealBizFormItem(item)) {
        // FormItemUnion | BizFormItemUnion<ShadowBiz>
        transformedItems.push(item)
      } else {
        // BizFormItemUnion<BizRealExtra>
        const bizTransformer = getBizTransformerByBizClass(item.biz.bizClass, bizFeatures)
        // 执行 `bizFeature` 上的 `BizTransformer.toShadow()` 转换
        const shadowItem = bizTransformer.toShadow(
          item,
          randomStr(BizFormEditorTransformer.RANDOM_STR_LENGTH),
        )
        transformedItems.push(shadowItem)
      }
    })

    return transformedItems
  }

  /**
   * 把一组 `FormItemUnion` 中所有的 `BizFormItemUnion<ShadowBiz>` 转换为对应的 `BizFormItemUnion<RealBiz>`
   *
   * (FormItemUnion | BizFormItemUnion<ShadowBiz>)[] -> (FormItemUnion | BizFormItemUnion<RealBiz>)[]
   */
  static batchToReal(
    items: (FormItemUnion | BizFormItemUnion<ShadowBiz>)[],
    bizFeatures: BizFormEditorFeature[],
  ): (FormItemUnion | BizFormItemUnion<RealBiz>)[] {
    const transformedItems: (FormItemUnion | BizFormItemUnion<RealBiz>)[] = []

    items.forEach((item) => {
      if (!BizFormHelper.isShadowBizFormItem(item)) {
        // FormItemUnion | BizFormItemUnion<RealBiz>
        transformedItems.push(item)
      } else {
        // BizFormItemUnion<ShadowBiz>
        const bizTransformer = getBizTransformerByBizClass(item.biz.bizClass, bizFeatures)
        // 执行 `BizTransformer.toReal()` 转换，结果可能是一个或多个配置项
        const itemOrItems = bizTransformer.toReal(
          item,
          randomStr(BizFormEditorTransformer.RANDOM_STR_LENGTH),
        )
        Array.isArray(itemOrItems)
          ? transformedItems.push(...itemOrItems)
          : transformedItems.push(itemOrItems)
      }
    })

    return transformedItems
  }
}

function deduplicate(items: FormItemUnion[]) {
  // 记录所有出现过的 `RealBiz.bizSymbol`
  const set = new Set<string>()

  return items.filter((item) => {
    // 忽略普通的 `FormItemUnion` 和 `BizFormItemUnion<ShadowBiz>`
    if (!BizFormHelper.isRealBizFormItem(item)) return true

    const biz: RealBiz = item.biz

    // 同一组 `RealBiz` 的不同控件有着相同的 `bizClass` 和 `bizSymbol`，只保留一个
    const flag = `${biz.bizClass}#${biz.bizSymbol}`

    if (set.has(flag)) {
      return false
    } else {
      set.add(flag)
      return true
    }
  })
}

function getBizTransformerByBizClass(
  bizClass: string,
  bizFeatures: BizFormEditorFeature[],
): BizTransformer {
  const bizFeature = bizFeatures.find((bizFeature) => bizFeature.bizClass === bizClass)
  if (!bizFeature) {
    throw new Error(
      createErrorMessage(
        `BizFeatureFormEditorTransformer.toReal error, no matching bizFeature was found, bizClass: ${bizClass}`,
      ),
    )
  }
  return bizFeature.bizTransformer
}
