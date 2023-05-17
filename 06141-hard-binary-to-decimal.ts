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
type LengthString<S, R extends number[] = []> = S extends `${infer F}${infer Rest}` ? LengthString<Rest, [...R , 1]> : R['length']
type RecursiveB2String<S extends string, Len extends number, Index extends number[]=[1], R extends string = '1'> = 
  S extends '0'
    ? ''
    : Equal<Index["length"], Len> extends true
      ? R
      : RecursiveB2String<S, Len, [...Index, 1], `${R}${R}`>
    
type BinaryToDecimal<S extends string , R extends string = ''> =
  S extends `${infer F}${infer Rest}`
    ? BinaryToDecimal<Rest, `${R}${RecursiveB2String<F, LengthString<S>>}`>
    : LengthString<R>
