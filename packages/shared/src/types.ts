export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [keyof Obj] extends [never]
  ? true
  : false

export type IsNotEmptyObject<Obj extends Record<PropertyKey, unknown>> =
  IsEmptyObject<Obj> extends true ? false : true

export type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>
}[U] &
  string[]
