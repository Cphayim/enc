import type { FormItemUnion, PartialFormItemIntersection } from '../form'
import { BizFormHelper, BizFormItemUnion, RealBiz } from '../biz-form'
import { FormAnalyzer } from './FormAnalyzer'

/**
 * 业务表单项的分析树结构
 * - 第 1 层为 `bizClass`，业务类名
 * - 第 2 层为 `bizSymbol`，即同一业务类的不同实例标识（用来区分同一种业务控件的不同分组）
 * - 第 3 层为 `bizName`，即业务控件下的某个字段
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
  private _bizItems: BizFormItemUnion<RealBiz>[] = []
  private _bizItemMap = new Map<string, BizFormItemUnion<RealBiz>>()

  constructor(items: FormItemUnion[]) {
    super(items)
    this._bizItems = BizFormHelper.filterRealBizFormItems(items)
    this._bizItems.forEach((item) => this._bizItemMap.set(item.name, item))
  }

  getBizItems() {
    return this._bizItems
  }

  findBizItems(matcher?: PartialFormItemIntersection, bizMatcher?: Partial<RealBiz>) {
    const matched = this.matchingItems(this._bizItems, matcher)
    return !bizMatcher ? matched : BizFormHelper.filterRealBizFormItems(matched, bizMatcher)
  }

  /**
   * 获取一棵叶子为业务表单项的分析树 `BizAnalysisTree<BizFormItemUnion<RealBiz>>`
   * @returns
   */
  getItemAnalysisTree(): BizAnalysisTree<BizFormItemUnion<RealBiz>> {
    return this.createAnalysisTree((item) => item)
  }

  /**
   * 获取一棵叶子为表单数据的分析树 `BizAnalysisTree<any>`
   * @param formData
   * @returns
   */
  getDataAnalysisTree(formData: Record<string, any>): BizAnalysisTree<any> {
    return this.createAnalysisTree((item) => formData[item.name])
  }

  /**
   * 生成一棵业务分析树
   * @param cb `(item: BizFormItemUnion<RealBiz>) => T` 将对每一项调用该回调函数，返回值放入树的叶子节点
   * @returns
   */
  createAnalysisTree<T>(cb: (item: BizFormItemUnion<RealBiz>) => T): BizAnalysisTree<T> {
    const tree: BizAnalysisTree<T> = {}

    this._bizItems.forEach((item) => {
      const biz = item.biz
      const bizSymbolMap = tree[biz.bizClass] ?? (tree[biz.bizClass] = {})
      const bizNameMap = bizSymbolMap[biz.bizSymbol] ?? (bizSymbolMap[biz.bizSymbol] = {})
      bizNameMap[biz.bizName] = cb(item)
    })

    return tree
  }
}

export function createBizFormAnalyzer(items: FormItemUnion[]) {
  return new BizFormAnalyzer(items)
}
