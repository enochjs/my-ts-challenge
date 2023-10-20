// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============

type FlattenDepthOne<T extends any[]> =
  T extends [infer F, ...infer Rest]
    ? F extends any[]
      ? [...F, ...FlattenDepthOne<Rest>]
      : [F, ...FlattenDepthOne<Rest>]
    : []

type CanFlatten<T> = T extends [infer F, ...infer Rest]
  ? F extends any[]
    ? true
    : CanFlatten<Rest>
  : false

type a = FlattenDepthOne<[1, 2, [3, 4], [[[5]]]]>

type FlattenDepth<T extends any[], D=1, C extends number[] = []> =
  C['length'] extends D
    ? T
    : CanFlatten<T> extends true
      ? FlattenDepth<FlattenDepthOne<T>, D, [...C, 1]>
      : T
    
    