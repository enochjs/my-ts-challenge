// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============

type ExcludeArr<T, U> =
  T extends [infer F, ...infer R]
    ? F extends U
      ? ExcludeArr<R, U>
      : [F, ...ExcludeArr<R, U>]
    : []

type Maximum<T extends number[], C extends unknown[] = []> =
  T extends []
    ? C extends [infer F, ...infer Rest] ? Rest['length'] : never
    : Maximum<ExcludeArr<T, C['length']>, [...C, 1]>
