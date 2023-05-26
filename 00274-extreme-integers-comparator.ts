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

type StringLength<T, C extends number[]=[]> = T extends `${infer F}${infer Rest}` ? StringLength<Rest, [...C, 1]> : C["length"]

type NumberToString<T extends number> = `${T}`

type StringToNumber<T extends string> = T extends `${infer R extends number}` ? R : never

type LargeThan<X extends number, Y extends number, C extends number[]=[]> =
 X extends C["length"]
  ? false
  : Y extends C["length"]
    ? true
    : LargeThan<X, Y, [...C, 1]>

type IsPositive<T extends number> = `${T}` extends `-${infer R}` ? false : true

type AbsValue<T extends number> = `${T}` extends `-${infer R extends number}` ? R : T

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


type Comparator<A extends number, B extends number> =
  IsPositive<A> extends true
    ? IsPositive<B> extends true
      ? ComparatorPositive<A, B>
      : Comparison.Greater
    : IsPositive<B> extends true
      ? Comparison.Lower
      : ComparatorPositive<AbsValue<B>, AbsValue<A>>
 