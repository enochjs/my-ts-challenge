// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IsNegative<T extends number> = `${T}` extends `-${infer R extends number}` ? true : false
type GetPositiveValue<T extends number> = `${T}` extends `-${infer R extends number}` ? R : T;
type NumberToString<T extends number> =  `${T}`

type StringLength<T extends string, R extends number[]=[]> = T extends `${infer F}${infer Rest}` ? StringLength<Rest, [...R, 1]> : R["length"]

type StringToNumber<T extends string> = T extends `${infer R extends number}` ? R : never 

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
