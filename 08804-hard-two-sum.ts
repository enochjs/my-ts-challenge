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
type NumberToArr<T, C extends number[] = []> = C["length"] extends T ? C : NumberToArr<T, [...C, 1]>

type Minus<T extends number[], U extends number[]> =
  T extends [infer F, ...infer TR extends number[]]
    ? U extends [infer F, ...infer UR extends number[]]
      ? Minus<TR, UR>
      : never
    : U["length"]

type Included<T extends number[], U> = 
  T extends [infer F, ...infer R extends number[]]
    ? Equal<F, U> extends true
      ? true
      : Included<R, U>
    : false

// type TwoSumFirst<T extends number[], U extends number> = 

type TwoSum<T extends number[], U extends number> =
  T extends [infer F, ...infer R extends number[]]
    ? Minus<NumberToArr<F>, NumberToArr<U>> extends never
      ? TwoSum<R, U>
      : Included<R, Minus<NumberToArr<F>, NumberToArr<U>>> extends true
        ? true
        : TwoSum<R, U>
    : false
