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

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

// ============= Your Code Here =============
type NumberToArr<T extends number, R extends number[]=[]> = R["length"] extends T ? R : NumberToArr<T, [...R, 1]>

type MinusArr<X, Y> =
  X extends [infer X1, ...infer XRest]
    ? Y extends [infer Y1, ...infer YRest]
      ? MinusArr<XRest, YRest>
      : X["length"]
    : never

type GetPositiveValue<T extends number, L extends number> = `${T}` extends `-${infer R extends number}` ? MinusArr<NumberToArr<L>, NumberToArr<R>> : T
  
type SlicePositive<Arr extends unknown[], Start, End, R extends unknown[]=[], Flag extends boolean = Start extends 0 ? true : false, Index extends number[]=[]> =
  Index["length"] extends End
    ? R
    : Arr extends [infer F, ...infer Rest]
      ? SlicePositive<Rest, Start, End, Flag extends true ? [...R, F] : R, Flag extends false ? [...Index, 1]['length'] extends Start ? true : false : true, [...Index, 1]>
      : R

type Slice<Arr extends unknown[], Start extends number = 0, End extends number = Arr["length"]> = SlicePositive<Arr, GetPositiveValue<Start, Arr["length"]>, GetPositiveValue<End, Arr["length"]>>

