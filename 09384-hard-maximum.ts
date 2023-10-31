// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============

type Compare = {
  Large: 1,
  Equal: 0,
  Less: -1
}

type LengthOfString<T, R extends number[] = []> = T extends `${infer F}${infer Rest}` ? LengthOfString<Rest, [...R, 1]> : R['length'] 

type CompareByLength<A extends string, B extends string> =
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? CompareByLength<ARest, BRest>
      : true
    : false

type CompareLittleValue<A extends string, B extends string, I extends number[] = []> =
  `${I['length']}` extends A 
    ? false
    : `${I['length']}` extends B
      ? true
      : CompareLittleValue<A, B, [...I, 1]>

type CompareByEqualLength<A extends string, B extends string> = 
  A extends `${infer A1}${infer ARest}`
    ? B extends `${infer B1}${infer BRest}`
      ? A1 extends B1
        ? CompareByEqualLength<ARest, BRest>
        : CompareLittleValue<A1, B1>
      : false
    : false

type CompareString<A extends string, B extends string, AL = LengthOfString<A>, BL=LengthOfString<B>> =
  AL extends BL
    ? CompareByEqualLength<A, B>
    : CompareByLength<A, B>

type GetLargerValue<A extends string, B extends string> = CompareString<A, B> extends true ? A : B

type String2Number<T> = T extends `${infer R extends number}` ? R : never


type Maximum<T extends number[], R = never> =
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? Maximum<Rest, [R] extends [never] ? `${F}` : R extends string ? GetLargerValue<R, `${F}`> : never>
    : String2Number<R>
