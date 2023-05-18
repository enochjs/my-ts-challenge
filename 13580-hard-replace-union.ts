// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]


// ============= Your Code Here =============

type UnionReplaceOne<T, U> =
  U extends [infer S, infer R]
    ? S extends T
      ? Exclude<T, S> | R
      : T
    : never
    
type UnionReplace<T, U extends [any, any][]> =
  U extends [infer F, ...infer R extends [any,any][]]
    ? UnionReplace<UnionReplaceOne<T, F>, R>
    : T
