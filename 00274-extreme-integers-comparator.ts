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

type Number2String<T extends number> = `${T}`
type String2Number<T extends string> = T extends `${infer R extends number}` ? R : never


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

type Comparator<A extends number, B extends number> =
  Number2String<A> extends `-${infer A1 extends number}`
    ? Number2String<B> extends `-${infer B1 extends number}`
      ? ComparePositive<B1, A1>
      : Comparison.Lower
    : Number2String<B> extends `-${infer B1 extends number}`
      ? Comparison.Greater
      : ComparePositive<A, B>
