import type { FormItemUnion, PartialFormItemIntersectionWithoutNameAndType } from '../form'
import { BizFormHelper, BizFormItemUnion, BizRealExtra } from '../biz-form'
import { FormAnalyzer } from './FormAnalyzer'

/**
 * 业务表单项的分析树结构
 * - 第 1 层为 `bizName`，即不同的业务控件
 * - 第 2 层为 `bizKey`，即同一业务控件的不同实例标识（用来区分同一种业务控件的不同分组）
 * - 第 3 层为 `bizField`，即业务控件下的某个字段
 */
export type BizAnalysisTree<T> = {
  [bizName: string]: {
    [bizKey: string]: {
      [bizField: string]: T
    }
  }
}

/**
 * 业务表单分析器
 *
 * 注意：
 * 这里仅解析 `items` 中的 `BizFormItemUnion<BizRealExtra>` 项，
 * 将忽略 `BizFormItemUnion<BizPlaceholderExtra>`
 */
export class BizFormAnalyzer extends FormAnalyzer {
  private _bizItems: BizFormItemUnion<BizRealExtra>[] = []
  private _bizItemMap = new Map<string, BizFormItemUnion<BizRealExtra>>()

  constructor(items: FormItemUnion[]) {
    super(items)
    this._bizItems = BizFormHelper.filterBizFormItemsReal(items)
    this._bizItems.forEach((item) => this._bizItemMap.set(item.name, item))
  }

  getBizItems() {
    return this._bizItems
  }

  findBizItems(
    rule?: PartialFormItemIntersectionWithoutNameAndType,
    bizRule?: Partial<Omit<BizRealExtra, 'biz'>>,
  ) {
    const matched = this.matchingItems(this._bizItems, rule)
    return !bizRule ? matched : BizFormHelper.filterBizFormItemsReal(matched, bizRule)
  }

  /**
   * 获取一棵叶子为业务表单项的分析树
   * @returns
   */
  getBizItemAnalysisTree(): BizAnalysisTree<BizFormItemUnion<BizRealExtra>> {
    return this.generateBizAnalysisTree((item) => item)
  }

  /**
   * 获取一棵叶子为表单数据的分析树
   * @param formData
   * @returns
   */
  getDataAnalysisTree(formData: Record<string, any>): BizAnalysisTree<any> {
    return this.generateBizAnalysisTree((item) => formData[item.name])
  }

  /**
   * 生成一棵业务分析树
   * @param cb `(item: BizFormItemUnion<BizRealExtra>) => T` 将对每一项调用该回调函数，返回值放入树的叶子节点
   * @returns
   */
  generateBizAnalysisTree<T>(cb: (item: BizFormItemUnion<BizRealExtra>) => T): BizAnalysisTree<T> {
    const tree: BizAnalysisTree<T> = {}

    this._bizItems.forEach((item) => {
      const extra = this.getExtra(item)
      const bizKeyMap = tree[extra.bizName] ?? (tree[extra.bizName] = {})
      const bizFieldMap = bizKeyMap[extra.bizKey] ?? (bizKeyMap[extra.bizKey] = {})
      const result = cb(item)
      bizFieldMap[extra.bizField] = result
    })

    return tree
  }

  private getExtra(bizItem: BizFormItemUnion<BizRealExtra>): BizRealExtra {
    return bizItem.extra!
  }
}

export function createBizFormAnalyzer(items: FormItemUnion[]) {
  return new BizFormAnalyzer(items)
}
