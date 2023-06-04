import type { FormItemUnion, PartialFormItemIntersection } from '../form'

/**
 * 表单分析器
 */
export class FormAnalyzer {
  private _items: FormItemUnion[] = []
  private _itemMap = new Map<string, FormItemUnion>()

  constructor(items: FormItemUnion[]) {
    this._items = items
    this._items.forEach((item) => this._itemMap.set(item.name, item))
  }

  getItems() {
    return this._items
  }

  findItems(matcher?: PartialFormItemIntersection) {
    return this.matchingItems(this._items, matcher)
  }

  protected matchingItems<T extends FormItemUnion>(
    items: T[],
    matcher?: PartialFormItemIntersection,
  ) {
    if (!matcher) return items
    return items.filter((item: any) =>
      Object.entries(matcher).every(([key, value]) => item[key] === value),
    )
  }

  getItem(name: string) {
    return this._itemMap.get(name)
  }
}

export function createFormAnalyzer(items: FormItemUnion[]) {
  return new FormAnalyzer(items)
}
