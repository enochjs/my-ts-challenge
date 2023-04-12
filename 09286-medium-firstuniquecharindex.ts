// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]


// ============= Your Code Here =============
type StringToTuple<T, C extends unknown[] = []> = T extends '' ? C : T extends `${infer F}${infer R}` ? StringToTuple<R, [...C, F]> : never
type StingToUnion<T extends string> = StringToTuple<T>[number]
type FirstUniqueCharIndex<T extends string, C extends unknown[] = [], PRE extends string = ''> =
  C["length"] extends StringToTuple<T>["length"]
    ? -1
    : T extends `${infer F}${infer R}`
      ? F extends StingToUnion<`${PRE}${R}`>
        ? FirstUniqueCharIndex<R, [...C, 1], `${PRE}${F}`>
        : C["length"]
      : never
