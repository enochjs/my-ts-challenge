// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============
type IsNumber<T extends string> = Lowercase<T> extends T  ? true : false
type RepeatString<S extends string, N, R extends string = '', C extends number[] = []> =
  `${C["length"]}` extends N
    ? R
    : RepeatString<S, N, `${R}${S}`, [...C, 1]>

namespace RLE {
  export type Encode<S extends string, R extends string = '', Pre extends string = '', C extends number[] = []> =
    S extends `${infer F}${infer Rest}`
      ? F extends Pre
        ? Encode<Rest, R, Pre, [...C, 1]>
        : Pre extends ''
          ? Encode<Rest, R, F, [...C, 1]>
          : Encode<Rest, `${R}${C["length"] extends 1 ? Pre : `${C["length"]}${Pre}`}`, F, [1]>
      : C['length'] extends 0 ? R : `${R}${C["length"] extends 1 ? Pre : `${C["length"]}${Pre}`}`
  export type Decode<S extends string, R extends string = '', Pre extends string = '1'> =
    S extends `${infer F}${infer Rest}`
      ? IsNumber<F> extends true
        ? Decode<Rest, R, F>
        : Decode<Rest, `${R}${RepeatString<F, Pre>}`, '1'>
      : R
}
