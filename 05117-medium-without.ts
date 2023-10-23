// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type ArrayToUnion<T extends any[], R = never> = T extends [infer F, ...infer Rest] ? ArrayToUnion<Rest, R | F> : R
type ToUnion<T> = T extends any[] ? ArrayToUnion<T> : T

type Without<T, U, R extends unknown[] = []> =
  T extends [infer F, ...infer Rest]
    ? F extends ToUnion<U>
      ? Without<Rest, U, R>
      : Without<Rest, U, [...R, F]>
    : R


type a = Without<[1], [1]>