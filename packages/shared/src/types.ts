export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [keyof Obj] extends [never]
  ? true
  : false

export type IsNotEmptyObject<Obj extends Record<PropertyKey, unknown>> =
  IsEmptyObject<Obj> extends true ? false : true

/**
 * 元组转联合
 */
export type TupleToUnion<T extends any[]> = T[number]

/**
 * 对元组的每一项 Omit
 */
export type TupleOmit<T extends any[], K extends PropertyKey> = {
  [P in keyof T]: Omit<T[P], K>
}

/**
 * 联合转交叉
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

/**
 * 对联合类型进行 Pick，并将 Pick 的字段组成联合类型
 *
 * @example
 * ```ts
 * PickInUnion<{ type: 'a', a1: number } | { type: 'b', b1: string }, 'type'> // { type: 'a' | 'b' }
 * ```
 */
export type PickInUnion<T, F extends PropertyKey> = Pick<Extract<T, { [K in F]: any }>, F>
