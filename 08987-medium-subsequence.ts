// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]


// ============= Your Code Here =============

type SubsequenceL<T extends unknown[], L extends unknown[]> = 
  T["length"] extends L["length"]
    ? T
    : T extends [infer F, ...infer Rest]
      ? L extends [infer LF, ...infer LRest]
        ? [F, ...SubsequenceL<Rest, LRest>] | SubsequenceL<Rest, L>
        : []
      : []

type Subsequence<T extends any[], C extends unknown[] = [], R = never> =
  T['length'] extends C["length"]
    ? R | SubsequenceL<T, C>
    : Subsequence<T, [...C, 1], SubsequenceL<T, C> | R>