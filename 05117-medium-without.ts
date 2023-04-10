// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============

type ArrayToTuple<T extends number[] | number> = T extends number[] ? T[number] : T

type Without<T extends number[], U extends number[] | number, R extends number[] = []> =
  T extends [] ? R :
    T extends [infer F extends number, ...infer Rest extends number[]] ?
      F extends ArrayToTuple<U>
        ? Without<Rest, U, R>
        : Without<Rest, U, [...R, F]>
      : never
