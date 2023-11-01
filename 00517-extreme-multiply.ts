// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]


// ============= Your Code Here =============

type Number2String<T extends string | number | bigint> = `${T}`
type String2Number<T extends string | number | bigint> = T extends `${infer R extends number}` ? R : never
type ReverseString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R
type Number2Arr<X extends number, R extends number[] = []> =
  // 解决ts 提示 infinity 问题
  R["length"] extends 10
    ? never
    : X extends R['length'] ? R : Number2Arr<X , [...R, 1]> 

// ===== sum start =======
type AddLittleNumber<X extends number, Y extends number, Z extends number, AX extends number[] = Number2Arr<X>, AY extends number[] = Number2Arr<Y>, AZ extends number[] = Number2Arr<Z>> =
  [...AX, ...AY, ...AZ] extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer Rest]
    ? [Rest['length'], 1]
    : [[...AX, ...AY, ...AZ]['length'], 0]

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
// ===== sum end =======


// ===== minus start =======
type MinusLittle<X extends number, Y extends number, Z extends number, AX extends number[] = Number2Arr<X>, AY extends number[] = Number2Arr<Y>, AZ extends number[] = Number2Arr<Z>> =
  AX extends [...AY, ...AZ, ...infer Rest]
    ? [Rest['length'], 0]
    : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...AX] extends [...AY, ...AZ, ...infer Rest]
      ? [Rest['length'], 1]
      : never

type ClearZero<T extends string> = T extends `${infer R}0` ? ClearZero<R> : T;

type MinusReverse<X extends string, Y extends string, Carry extends number = 0, R extends string = ''> =
  X extends `${infer X1}${infer XRest}`
    ? Y extends `${infer Y1}${infer YRest}`
      ? MinusLittle<String2Number<X1>, String2Number<Y1>, Carry> extends [infer V extends number, infer NCarry extends number]
        ? MinusReverse<XRest, YRest, NCarry, `${R}${V}`>
        : never
      : MinusLittle<String2Number<X1>, 0, Carry> extends [infer V extends number, infer NCarry extends number]
        ? MinusReverse<XRest, '', NCarry, `${R}${V}`>
        : never
    : ClearZero<R>

type Minus<A extends string | number | bigint, B extends string | number | bigint> = ReverseString<MinusReverse<ReverseString<Number2String<A>>, ReverseString<Number2String<B>>>>
// ===== minus end =======

// ===compare start =======
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type ComparePositiveByLitterValue<A extends number, B extends number, I extends number[] = []> =
  I["length"] extends A
    ? I["length"] extends B
      ? Comparison.Equal
      : Comparison.Lower
    : I["length"] extends B
      ? Comparison.Greater
      : ComparePositiveByLitterValue<A, B, [...I, 1]>

type ComparePositiveByLength<A extends string, B extends string> =
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? ComparePositiveByLength<ARest, BRest>
      : Comparison.Greater
    : B extends `${infer B1}${infer BRest}`
      ? Comparison.Lower
      : Comparison.Equal

type ComparePositiveByEqualLength<A extends string, B extends String> =
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? A1 extends B1
        ? ComparePositiveByEqualLength<ARest, BRest>
        : ComparePositiveByLitterValue<String2Number<A1>, String2Number<B1>>
      : never
    : Comparison.Equal

type ComparePositive<A extends number, B extends number> =
  ComparePositiveByLength<Number2String<A>, Number2String<B>> extends Comparison.Equal
    ? ComparePositiveByEqualLength<Number2String<A>, Number2String<B>>
    : ComparePositiveByLength<Number2String<A>, Number2String<B>>
// ===compare end =======

type MultiplyString<
  A extends string,
  B extends string,
  OA extends string = A,
  CV extends string = '1',
  C extends Comparison = ComparePositive<String2Number<Sum<CV, CV>>, String2Number<B>>,
  S extends string = Sum<A, A>
> =
  B extends '0' ? '0' : A extends 0 ? '0' :
  B extends '1'
    ? A
    : C extends Comparison.Lower
      ? MultiplyString<S, B, OA, Sum<CV, CV>>
      : C extends Comparison.Greater
        ? Sum<A, MultiplyString<OA, Minus<B, CV>>>
        : Sum<A, A>



type Multiply<A extends string | number | bigint, B extends string | number | bigint> = MultiplyString<Number2String<A>, Number2String<B>>
