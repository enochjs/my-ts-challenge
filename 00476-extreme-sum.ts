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
  SplitValue<SumOne<A1, B1, Pre>> extends [infer P extends string, infer L extends string]
    ? Sum<ARest, BRest, P extends '' ? '0' : P, `${R}${L}`>
    : never

type GetLast<T extends string | number | bigint, Pre=''> = NumberToString<T> extends `${infer F}${infer Rest}` ? GetLast<Rest, F> : Pre;

type Sum<A extends string | number | bigint, B extends string | number | bigint, Pre extends string='0', R extends string = ''> =
    NumberToString<A> extends `${infer ARest}${GetLast<A>}`
      ? NumberToString<B> extends `${infer BRest}${GetLast<B>}`
        ? SumOneResult<GetLast<A>, GetLast<B>, Pre, ARest, BRest, R>
        : SumOneResult<GetLast<A>, '0', Pre, ARest, '' , R>
      : NumberToString<B> extends `${infer BRest}${GetLast<B>}`
        ? SumOneResult<'0', B1, Pre, '', BRest, R>
        : Pre extends '0' ? R : `${Pre}${R}`

