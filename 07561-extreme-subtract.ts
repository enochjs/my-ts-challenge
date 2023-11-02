// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]


// ============= Your Code Here =============
type Number2Arr<X extends number, R extends number[] = []> =
  // 解决ts 提示 infinity 问题
  R["length"] extends 10
    ? never
    : X extends R['length'] ? R : Number2Arr<X , [...R, 1]> 

type Subtract<M extends number, S extends number, XM extends number[] = Number2Arr<M>, XS extends number[] = Number2Arr<S>> =
  XM extends [...XS, ...infer Rest]
    ? Rest['length']
    : never
