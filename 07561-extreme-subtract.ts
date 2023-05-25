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
// M => minuend, S => subtrahend
type LargerThan<X extends number, Y extends number, C extends number[]=[]> =
  X extends C["length"]
    ? false
    : Y extends C["length"]
      ? true
      : LargerThan<X, Y, [...C, 1]>

type Subtract<M extends number, S extends number, C extends number[]=[], R extends number[]=[], Flag extends boolean = S extends 0 ? true : false> =
  LargerThan<S, M> extends true
    ? never
    : M extends C["length"]
      ? R["length"]
      : Subtract<M, S, [...C, 1], Flag extends true ? [...R, 1] : R, Flag extends false ? [...C, 1]["length"] extends S ? true : false : true>

type aa = Subtract<3, 1>