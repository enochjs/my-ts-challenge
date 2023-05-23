// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Expect<Equal<Sum<2, 3>, '5'>>,
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
type LengthToArr<T extends number, R extends number[]=[]> =
  R["length"] extends T
    ? R
    : LengthToArr<T, [...R, 1]>

type AddArr<T extends number[], R extends number[]> =
  T extends [infer F, ...infer Rest extends number[]]
    ? AddArr<Rest, [...R, 1]>
    : R

type SumArr<T extends number[], R extends number[] = []> = 
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? SumArr<Rest, AddArr<LengthToArr<F>, R>>
    : R["length"]

type StringToNumber<T> = T extends `${infer R extends number}` ? R : never

type NumberToString<T extends string | number | bigint> = `${T}`


type SumOne<X extends string, Y extends string, Z extends string = '0'> = SumArr<[StringToNumber<X>, StringToNumber<Y>, StringToNumber<Z>]>

type SplitValue<T> = T extends number ? (`${T}` extends `${infer F}${infer R}` ? [R extends '' ? '' : F, R extends '' ? F : R] : never) : never

type SumOneResult<A1 extends string, B1 extends string, Pre extends string,  ARest extends string, BRest extends string, R extends string> = 
  SplitValue<SumOne<A1, B1, Pre extends '' ? '0' : Pre>> extends [infer P extends string, infer L extends string]
    ? SumString<ARest, BRest, P, `${L}${R}`>
    : never

type Reverse<T extends string, R extends string = ''> =
  T extends `${infer F}${infer Rest}`
    ? Reverse<Rest, `${F}${R}`>
    : R

type SumString<A extends string, B extends string, Pre extends string='', R extends string=''> =
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? SumOneResult<A1, B1, Pre, ARest, BRest, R>
      : SumOneResult<A1, '0', Pre, ARest, '', R>
    : B extends `${infer B1}${infer BRest}`
      ? SumOneResult<'0', B1, Pre, '', BRest, R>
      : `${Pre}${R}`

type Sum<A extends string | number | bigint, B extends string | number | bigint> = SumString<Reverse<NumberToString<A>>, Reverse<NumberToString<B>>>
