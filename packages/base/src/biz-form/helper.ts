import type { FormItemUnion } from '../form'
import type { BizFormItemUnion, BizPlaceHolderExtra, BizRealExtra } from './BizFormItemUnion'

export function isBizFormItem(item: FormItemUnion): item is BizFormItemUnion {
  return !!item.extra?.biz
}

export function isBizFormItemPlaceholder(
  item: FormItemUnion,
): item is BizFormItemUnion<BizPlaceHolderExtra> {
  return isBizFormItem(item) && !!(item as BizFormItemUnion<BizPlaceHolderExtra>).extra?.bizLabel
}

export function isBizFormItemReal(item: FormItemUnion): item is BizFormItemUnion<BizRealExtra> {
  return (
    isBizFormItem(item) &&
    !!(item as BizFormItemUnion<BizRealExtra>).extra?.bizField &&
    !!(item as BizFormItemUnion<BizRealExtra>).extra?.bizKey
  )
}
