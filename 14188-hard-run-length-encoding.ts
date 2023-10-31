// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============

type IsLetter<S extends string> = Uppercase<S> extends Lowercase<S> ? false : true

type GetRepeatN<T extends string> = T extends '' ? 1 : T extends `${infer R extends number}` ? R : never

type Repeat<T extends string, N extends number, R extends string = '', I extends number[] = []> = 
  I['length'] extends N
    ? R
    : Repeat<T, N, `${R}${T}`, [...I, 1]>

namespace RLE {
  export type Encode<S extends string, R extends string = '', Pre extends string[]=[]> =
    S extends `${infer F}${infer Rest}`
      ? Pre extends []
        ? Encode<Rest, R, [F]>
        : F extends Pre[0]
          ? Encode<Rest, R, [...Pre, F]>
          : Encode<Rest, `${R}${Pre['length'] extends 1 ? '' : Pre['length']}${Pre[0]}`, [F]>
        : `${R}${Pre['length'] extends 1 ? '' : Pre['length']}${Pre[0]}`
  export type Decode<S extends string, R extends string = '', Pre extends string = ''> =
    S extends `${infer F}${infer Rest}`
      ? IsLetter<F> extends true
        ? Decode<Rest, `${R}${Repeat<F, GetRepeatN<Pre>>}`, ''>
        : Decode<Rest, R, `${Pre}${F}`>
      : R

}
