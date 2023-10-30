// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]


// ============= Your Code Here =============

type Number2Arr<T extends number, R extends number[] = []> =
  R['length'] extends T
    ? R
    : Number2Arr<T, [...R, 1]>

type CanSum<T extends number[], P extends number, S extends number> =
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? [...Number2Arr<F>, ...Number2Arr<P>]['length'] extends S
      ? true
      : CanSum<Rest, P, S>
    : false

type TwoSum<T extends number[], U extends number> =
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? CanSum<Rest, F, U> extends true
      ? true
      : TwoSum<Rest, U>
    : false