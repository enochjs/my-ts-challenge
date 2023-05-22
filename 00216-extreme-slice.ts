// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // -3 => 2
  // -1 = 4

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]


// ============= Your Code Here =============

// translate negative index to positive index
type IsNegative<T extends number> = `${T}` extends `-${infer R}` ? true : false

type AbsValue<T extends number> = `${T}` extends `-${infer R extends number}` ? R : T;

type NumberToArr<T extends number, R extends number[] = []> = R['length'] extends T ? R : NumberToArr<T, [...R, 1]>

// min max
type Minus<X extends unknown[], Y extends unknown[]> =
    X extends [infer X1, ...infer XRest]
      ? Y extends [infer Y1, ...infer YRest]
        ? Minus<XRest, YRest>
        : never
      : Y["length"]

type GetPositiveIndex<Index extends number, Length extends number> =
  IsNegative<Index> extends true
    ? Minus<NumberToArr<AbsValue<Index>>, NumberToArr<Length>>
    : Index

type SlicePositive<Arr extends unknown[], Start, End, Index extends number[]=[], R extends unknown[] = [], flag extends boolean = Start extends 0 ? true : false> =
  Index["length"] extends Arr['length'] ? R :
    Index["length"] extends End
      ? R
      : SlicePositive<Arr, Start, End, [...Index, 1], flag extends true ? [...R, Arr[Index['length']]] : R, flag extends false ? [...Index, 1]['length'] extends Start ? true : false : true >

type Slice<Arr extends unknown[], Start extends number=0, End extends number=Arr['length']> = SlicePositive<Arr, GetPositiveIndex<Start, Arr['length']>, GetPositiveIndex<End, Arr['length']>>
