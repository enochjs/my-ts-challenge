// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]


// ============= Your Code Here =============

type ToUnion<T, R=never> =
  T extends any[]
    ? T extends [infer F, ...infer Rest]
      ? ToUnion<Rest, R | F>
      : R
    : T

type ToArrayUnion<T, R extends unknown[] = []> = T extends [infer F, ...infer Rest]
  ? ToArrayUnion<Rest, [...R, ToUnion<F>]>
  : R

type UnionInclude<T, U> =
  T extends [infer F, ...infer Rest]
    ? U extends F
      ? UnionInclude<Rest, U>
      : never
    : U

type IntersectionUnion<T> =
  T extends [infer F, ...infer Rest]
    ? UnionInclude<Rest, F>
    : never


type Intersection<T> = IntersectionUnion<ToArrayUnion<T>>
