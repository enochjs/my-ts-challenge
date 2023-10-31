// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]


// ============= Your Code Here =============

type Replace<T, U extends [any, any][]> = 
  U extends [infer F extends [any, any], ...infer Rest extends [any, any][]]
    ? T extends F[0]
      ? F[1]
      : Replace<T, Rest>
    : T

type UnionReplace<T, U extends [any, any][]> =
  T extends T
    ? Replace<T, U>
    : never
