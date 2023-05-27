// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
type NumberToString<T extends number | string | bigint> = `${T}`

type NumberToArr<T extends number, R extends number[]=[]> = R["length"] extends T ? R : NumberToArr<T, [...R, 1]>

type StringToNumber<T extends string> = T extends `${infer R extends number}` ? R : 0

type SumOneIndex<X extends number, Y extends number, Z extends number = 0> = [...NumberToArr<X>, ...NumberToArr<Y>, ...NumberToArr<Z>]["length"]

type SplitResult<X> = X extends number ? `${X}` extends `${infer F}${infer L}` ? L extends '' ? ['0', F] : [F, L] : never : never

type ReverseString<S extends string , R extends string = ''> = S extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R

type SumReverseString<A extends string, B extends string, R extends string = '', Pre extends string = ''> =
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? SplitResult<SumOneIndex<StringToNumber<A1>, StringToNumber<B1>, StringToNumber<Pre>>> extends [infer F extends string, infer L extends string]
        ? SumReverseString<ARest, BRest, `${R}${L}`, `${F}`>
        : never
      :  SplitResult<SumOneIndex<StringToNumber<A1>, StringToNumber<Pre>>> extends [infer F extends string, infer L extends string]
        ? SumReverseString<ARest, '', `${R}${L}`, `${F}`>
        : never
    : B extends `${infer B1}${infer BRest}`
      ? SplitResult<SumOneIndex<StringToNumber<B1>, StringToNumber<Pre>>> extends [infer F extends string, infer L extends string]
        ? SumReverseString<'', BRest, `${R}${L}`, `${F}`>
        : never
      : Pre extends '0' ? R : `${R}${Pre}`

type Sum<A extends string | number | bigint, B extends string | number | bigint> = ReverseString<SumReverseString<ReverseString<NumberToString<A>>, ReverseString<NumberToString<B>>>>
