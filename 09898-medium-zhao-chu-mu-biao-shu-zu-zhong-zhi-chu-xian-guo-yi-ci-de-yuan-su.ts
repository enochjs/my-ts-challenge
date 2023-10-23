// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]


// ============= Your Code Here =============

type RecordIndex<T extends any[], R extends Record<any, number[]> = {}> =
  T extends [infer F extends number, ...infer Rest]
    ? RecordIndex<Rest, Omit<R, F> & Record<F, R[F] extends number[] ? [...R[F], 1] : [1]> >
    : R

type FindEles<T extends any[], C extends Record<any, number[]> = RecordIndex<T>, R extends unknown[]= []> =
  T extends [infer F, ...infer Rest]
    ? C[F] extends number[]
      ? C[F]['length'] extends 1
        ? FindEles<Rest, C, [...R, F]>
        : FindEles<Rest, C, R>
      : never
    : R

