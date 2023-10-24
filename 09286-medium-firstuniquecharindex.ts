// ============= Test Cases =============
import type { Equal, Expect, Merge } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
type RecordIndex<T extends string , R extends Record<string, number[]> = {}> =
  T extends `${infer F}${infer Rest}`
    ? RecordIndex<Rest, Omit<R, F> & Record<F,  R[F] extends number[] ? [...R[F], 1] : [1]>>
    : R

type FirstUniqueCharIndex<T extends string, R extends Record<string, number[]> = RecordIndex<T>, Index extends number[] = []> =
    T extends `${infer F}${infer Rest}`
      ? R[F]['length'] extends 1
        ? Index["length"]
        : FirstUniqueCharIndex<Rest, R, [...Index, 1]>
      : -1
