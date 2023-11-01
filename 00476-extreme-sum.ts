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
type Number2Arr<X extends number, R extends number[] = []> =
  // 解决ts 提示 infinity 问题
  R["length"] extends 10
    ? never
    : X extends R['length'] ? R : Number2Arr<X , [...R, 1]> 

type AddLittleNumber<X extends number, Y extends number, Z extends number, AX extends number[] = Number2Arr<X>, AY extends number[] = Number2Arr<Y>, AZ extends number[] = Number2Arr<Z>> =
  [...AX, ...AY, ...AZ] extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer Rest]
    ? [Rest['length'], 1]
    : [[...AX, ...AY, ...AZ]['length'], 0]

type Number2String<T extends string | number | bigint> = `${T}`
type String2Number<T extends string> = T extends `${infer R extends number}` ? R : never

type ReverseString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R


type AddReverseString<X extends string, Y extends string, Carry extends number = 0, R extends string = ''> =
  X extends `${infer X1}${infer XRest}`
    ? Y extends `${infer Y1}${infer YRest}`
      ? AddLittleNumber<String2Number<X1>, String2Number<Y1>, Carry> extends [infer V extends number, infer NCarry extends number]
        ? AddReverseString<XRest, YRest, NCarry, `${R}${V}`>
        : never
      : AddLittleNumber<String2Number<X1>, 0, Carry> extends [infer V extends number, infer NCarry extends number]
        ? AddReverseString<XRest, '', NCarry, `${R}${V}`>
        : never
    : Y extends `${infer Y1}${infer YRest}`
      ? AddLittleNumber<0, String2Number<Y1>, Carry> extends [infer V extends number, infer NCarry extends number]
        ? AddReverseString<'', YRest, NCarry, `${R}${V}`>
        : never
      : Carry extends 0
        ? R
        : `${R}${Carry}`

type Sum<A extends string | number | bigint, B extends string | number | bigint> = ReverseString<AddReverseString<ReverseString<Number2String<A>>, ReverseString<Number2String<B>>>>
