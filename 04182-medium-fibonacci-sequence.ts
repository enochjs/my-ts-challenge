// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type Fibonacci<T extends number, C extends number[] = [1, 1, 1], R1 extends number[] = [1], R2 extends number[] = [1]> =
  T extends 1
   ? 1
    : T extends 2
      ? 1
      : C['length'] extends T
        ? [...R1, ...R2]['length']
        : Fibonacci<T, [...C, 1], R2, [...R1, ...R2]>
  