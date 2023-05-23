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

type NumberToArr<T extends number, R extends number[]=[]> =
  R["length"] extends T
    ? R
    : NumberToArr<T, [...R, 1]>

type AddArr<T extends number[], R extends number[]> =
  T extends [infer F, ...infer Rest extends number[]]
    ? AddArr<Rest, [...R, 1]>
    : R

type SumArr<T extends number[], R extends number[] = []> = 
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? SumArr<Rest, AddArr<NumberToArr<F>, R>>
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

type LessThan<A extends number, B extends number, C extends number[] = []> =  A extends B ? false : A extends C["length"] ? true : B extends C["length"] ? false : LessThan<A, B, [...C, 1]>

type MinisArr<A extends number[], B extends number[]> =
  A extends [infer A1, ...infer ARest extends number[]]
    ? B extends [infer B1, ...infer BRest extends number[]]
      ? MinisArr<ARest, BRest>
      : A["length"]
    : 0

type MinisOneValue<A extends number, B extends number, lend extends boolean=false> =
  LessThan<A, B> extends true
    ? MinisOneValue<StringToNumber<Sum<A, 10>>, B, true>
    : [MinisArr<NumberToArr<A>, NumberToArr<B>>, lend]

type AddOne<T extends number> = [...NumberToArr<T>, 1]["length"] extends number ? [...NumberToArr<T>, 1]["length"] : never


type MinisReverse<A extends string, B extends string, lend extends boolean=false, R extends string = ''> =
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? MinisOneValue<StringToNumber<A1>, lend extends true ? AddOne<StringToNumber<B1>> : StringToNumber<B1>> extends [infer Res extends number, infer L extends boolean]
        ? MinisReverse<ARest, BRest, L, `${R}${Res}`>
        : never
      : lend extends false ?  `${R}${A extends '0' ? '' : A}` : MinisReverse<A, '1', false, R>
    : R
    
type DeletePreZero<T extends string> = T extends '' ? '0' : T extends `0${infer R}` ? DeletePreZero<R> : T;
    
type Minus<A extends string, B extends string> = DeletePreZero<Reverse<MinisReverse<Reverse<A>, Reverse<B>>>>

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IsNegative<T extends number> = `${T}` extends `-${infer R extends number}` ? true : false
type GetPositiveValue<T extends number> = `${T}` extends `-${infer R extends number}` ? R : T;
type StringLength<T extends string, R extends number[]=[]> = T extends `${infer F}${infer Rest}` ? StringLength<Rest, [...R, 1]> : R["length"]


type LargerThan<X, Y, C extends number[]=[]> =
  X extends C["length"]
    ? false
    : Y extends C["length"]
      ? true
      : LargerThan<X, Y ,[...C, 1]>
    

type ComparisonEqualLength<X extends string, Y extends string> =
  X extends `${infer X1}${infer XRest}`
    ? Y extends `${infer Y1}${infer YRest}`
      ? X1 extends Y1
        ? ComparisonEqualLength<XRest, YRest>
        : LargerThan<StringToNumber<X1>, StringToNumber<Y1>> extends true
          ? Comparison.Greater
          : Comparison.Lower
      : never
    : Comparison.Equal

type ComparisonPositive<X extends number, Y extends number> =
  StringLength<NumberToString<X>> extends StringLength<NumberToString<Y>>
    ? ComparisonEqualLength<NumberToString<X>, NumberToString<Y>>
    : LargerThan<StringLength<NumberToString<X>>, StringLength<NumberToString<Y>>> extends true
      ? Comparison.Greater
      : Comparison.Lower
  

type Comparator<A extends number, B extends number> =
  IsNegative<A> extends true
    ? IsNegative<B> extends true
      ? ComparisonPositive<GetPositiveValue<B>, GetPositiveValue<A>>
      : Comparison.Lower
    : IsNegative<B> extends true
      ? Comparison.Greater
      : ComparisonPositive<GetPositiveValue<A>, GetPositiveValue<B>>

type MultiplyString<A extends string, B extends string, OA extends string = A,  R extends string = '0', C extends string = '1'> =
  B extends '0'
    ? R
    : Comparator<StringToNumber<B>, StringToNumber<Sum<C, C>>> extends Comparison.Equal
      ? Sum<R, Sum<A, A>>
      : Comparator<StringToNumber<B>, StringToNumber<Sum<C, C>>> extends Comparison.Greater
        ? MultiplyString<Sum<A, A>, B, OA, R, Sum<C, C>>
        : MultiplyString<OA, Minus<B, C>, OA, Sum<R, A>, '1'>

type Multiply<A extends string | number | bigint, B extends string | number | bigint> = MultiplyString<NumberToString<A>, NumberToString<B>>
