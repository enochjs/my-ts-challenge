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

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type StringLength<T, C extends number[]=[]> = T extends `${infer F}${infer Rest}` ? StringLength<Rest, [...C, 1]> : C["length"]

type LargeThan<X extends number, Y extends number, C extends number[]=[]> =
 X extends C["length"]
  ? false
  : Y extends C["length"]
    ? true
    : LargeThan<X, Y, [...C, 1]>

type ComparatorEqualLengthValue<X extends string, Y extends string> =
  X extends `${infer X1}${infer XRest}`
    ? Y extends `${infer Y1}${infer YRest}`
      ? X1 extends Y1
        ? ComparatorEqualLengthValue<XRest, YRest>
        : LargeThan<StringToNumber<X1>, StringToNumber<Y1>> extends true
          ? Comparison.Greater
          : Comparison.Lower
      : never
    : Comparison.Equal

type ComparatorPositive<X extends number, Y extends number> =
  X extends Y
    ? Comparison.Equal
    : LargeThan<StringLength<NumberToString<X>>, StringLength<NumberToString<Y>>> extends true
      ? Comparison.Greater
      : LargeThan<StringLength<NumberToString<Y>>, StringLength<NumberToString<X>>> extends true
        ? Comparison.Lower
        : ComparatorEqualLengthValue<NumberToString<X>, NumberToString<Y>>



type MinusArr<X extends number[], Y extends number[]> = 
  X["length"] extends Y["length"] ? 0 :
  X extends [infer X1, ...infer XRest extends number[]]
    ? Y extends [infer Y1, ...infer YRest extends number[]]
      ? MinusArr<XRest, YRest>
      : X["length"]
    : never

type MinusOneIndex<X extends number, Y extends number> =
  ComparatorPositive<X, Y> extends Comparison.Lower
    ? [MinusArr<NumberToArr<StringToNumber<Sum<X, 10>>>, NumberToArr<Y>>, 1]
    : [MinusArr<NumberToArr<X>, NumberToArr<Y>>, 0]

type MinusReverseString<X extends string, Y extends string, R extends string = '', Pre extends number = 0> =
    X extends `${infer X1}${infer XRest}`
      ? Y extends `${infer Y1}${infer YRest}`
        ? MinusOneIndex<StringToNumber<X1>, StringToNumber<Sum<Y1, Pre>>> extends [infer V extends number, infer P extends number]
          ? MinusReverseString<XRest, YRest, `${R}${V}`, P>
          : never
        : MinusOneIndex<StringToNumber<X1>, Pre> extends [infer V extends number, infer P extends number]
          ? MinusReverseString<XRest, '', `${R}${V}`, P>
          : never
      : Pre extends 0 ? R : MinusOneIndex<StringToNumber<R>, Pre>

type DeleteZero<X> = X extends '' ? '0' : X extends `0${infer R}` ? DeleteZero<R> : X

type Minus<A extends string | number | bigint, B extends string | number | bigint> =
  DeleteZero<ReverseString<MinusReverseString<ReverseString<NumberToString<A>>, ReverseString<NumberToString<B>>>>>


type MultiplyString<A extends string, B extends string, R extends string = '0', O extends string = A, S extends string = '1'> =
  A extends '0'
    ? '0'
    : B extends '0'
      ? R
      : ComparatorPositive<StringToNumber<B>, StringToNumber<Sum<S, S>>> extends Comparison.Equal
        ? Sum<R, Sum<A, A>>
        : ComparatorPositive<StringToNumber<B>, StringToNumber<Sum<S, S>>> extends Comparison.Lower
          ? MultiplyString<O, Minus<B, S>, Sum<R, A>, O, '1'>
          : MultiplyString<Sum<A, A>, B, R, O, Sum<S, S>>

type Multiply<A extends string | number | bigint, B extends string | number | bigint> = MultiplyString<NumberToString<A>, NumberToString<B>>

