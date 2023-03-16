import {
  BizFormItemUnion,
  BizPlaceHolderExtra,
  BizRealExtra,
  FormItemUnion,
  isBizFormItemPlaceholder,
  isBizFormItemReal,
} from '@cphayim-enc/base'
import { createErrorMessage, randomStr } from '@cphayim-enc/shared'

import type { FormEditorBizFeature } from '../FormEditorBiz'

export class BizFeatureFormEditorTransformer {
  private static RANDOM_STR_LENGTH = 6

  /**
   * (FormItemUnion | BizFormItemUnion<BizRealExtra>)[] -> (FormItemUnion | BizFormItemUnion<BizPlaceholderExtra>)[]
   */
  static toPlaceHolder(
    items: (FormItemUnion | BizFormItemUnion<BizRealExtra>)[],
    bizFeatures: FormEditorBizFeature[],
  ) {
    // 有的业务控件可能由多个普通控件组合，先进行去重
    // 根据 item.extra.bizName+item.extra.bizKey 去重
    const uniqueItems = deduplicate(items)
    const transformedItems: (FormItemUnion | BizFormItemUnion<BizPlaceHolderExtra>)[] = []

    uniqueItems.forEach((item) => {
      if (!isBizFormItemReal(item)) {
        // FormItemUnion | BizFormItemUnion<BizPlaceholderExtra>
        transformedItems.push(item)
      } else {
        // BizFormItemUnion<BizRealExtra>
        const { bizName } = item.extra!
        const bizFeature = bizFeatures.find((bizFeature) => bizFeature.bizName === bizName)
        if (!bizFeature) {
          throw new Error(
            createErrorMessage(
              `BizFeatureFormEditorTransformer.toPlaceHolder error, no matching bizFeature was found, bizName: ${bizName}`,
            ),
          )
        }
        // 执行 toPlaceHolder 转换
        const placeHolderItem = bizFeature.bizTransformer.toPlaceHolder(
          item,
          randomStr(BizFeatureFormEditorTransformer.RANDOM_STR_LENGTH),
        )
        transformedItems.push(placeHolderItem)
      }
    })

    return transformedItems
  }

  /**
   * (FormItemUnion | BizFormItemUnion<BizPlaceholderExtra>)[] -> (FormItemUnion | BizFormItemUnion<BizRealExtra>)[]
   */
  static toReal(
    items: (FormItemUnion | BizFormItemUnion<BizPlaceHolderExtra>)[],
    bizFeatures: FormEditorBizFeature[],
  ) {
    const transformedItems: (FormItemUnion | BizFormItemUnion<BizRealExtra>)[] = []

    items.forEach((item) => {
      if (!isBizFormItemPlaceholder(item)) {
        // FormItemUnion | BizFormItemUnion<BizRealExtra>
        transformedItems.push(item)
      } else {
        // BizFormItemUnion<BizPlaceholderExtra>
        const { bizName } = item.extra!
        const bizFeature = bizFeatures.find((bizFeature) => bizFeature.bizName === bizName)
        if (!bizFeature) {
          throw new Error(
            createErrorMessage(
              `BizFeatureFormEditorTransformer.toReal error, no matching bizFeature was found, bizName: ${bizName}`,
            ),
          )
        }

        // 执行 toReal 转换，结果可能是一个或多个配置项
        const itemOrItems = bizFeature.bizTransformer.toReal(
          item,
          randomStr(BizFeatureFormEditorTransformer.RANDOM_STR_LENGTH),
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
  const set = new Set<string>()
  return items.filter((item) => {
    if (!isBizFormItemReal(item)) return true

    // 同一组 biz 控件有着相同的 bizName 和 bizKey，只保留一个
    const flag = item.extra!.bizName + item.extra!.bizKey

    if (set.has(flag)) return false

    set.add(flag)
    return true
  })
}
