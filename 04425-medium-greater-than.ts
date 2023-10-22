// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]


// ============= Your Code Here =============
type Number2String<T extends number> = `${T}`
type String2Number<T extends string> = T extends `${infer R extends number}` ? R : number
type ReverseString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R
type CompareByLength<X extends string, Y extends string> = 
  X extends `${infer X1}${infer XRest}`
    ? Y extends `${infer Y1}${infer YRest}`
      ? CompareByLength<XRest, YRest>
      : 1
    : Y extends `${infer Y1}${infer YRest}`
      ? -1
      : 0

type CompareLittleNumber<X extends number, Y extends number, C extends unknown[] = []> = 
  Y extends C["length"]
    ? X extends C['length']
      ? 0
      : 1
    : X extends C["length"]
      ? true
      : CompareLittleNumber<X, Y, [...C, 1]>

type CompareByEqualLength<X extends string, Y extends string> =
  X extends `${infer XF}${infer XRest}`
    ? Y extends `${infer YF}${infer YRest}`
      ? CompareLittleNumber<String2Number<XF>, String2Number<YF>> extends 1
        ? true
        : CompareLittleNumber<String2Number<XF>, String2Number<YF>> extends -1
          ? false
          : CompareByEqualLength<XRest, YRest>
      : false
    : false



type GreaterThan<T extends number, U extends number> =
  CompareByLength<Number2String<T>, Number2String<U>> extends 1
    ? true
    : CompareByLength<Number2String<T>, Number2String<U>> extends -1
      ? false
      : CompareByEqualLength<ReverseString<Number2String<T>>, ReverseString<Number2String<U>>>
