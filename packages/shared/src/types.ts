export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj,
] extends [never]
  ? true
  : false

export type IsNotEmptyObject<Obj extends Record<PropertyKey, unknown>> =
  IsEmptyObject<Obj> extends true ? false : true
