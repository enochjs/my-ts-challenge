// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============

type Concat<T extends any[], U extends any[]> = [...T, ...U]
type RevereString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? RevereString<Rest, `${F}${R}`> : R
type BinaryToDecimal<S extends string, R extends string = RevereString<S>, Index extends any[] = [1], V extends any[] = []> =
  R extends `${infer F}${infer Rest}`
    ? F extends '0'
      ? BinaryToDecimal<S, Rest, Concat<Index, Index>, V>
      : BinaryToDecimal<S, Rest, Concat<Index, Index>, Concat<V, Index>>
    : V["length"]
