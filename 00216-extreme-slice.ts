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


type Positive<V extends number> = `${V}` extends `-${infer R extends number}` ? R : V

type GetNegativePosition<V extends number, Arr extends unknown[], L = Positive<V>, I extends number[] = []> = 
  I['length'] extends L
    ? Arr['length']
    : Arr extends [infer F, ...infer Rest ]
      ? GetNegativePosition<V, Rest, L, [...I, 1]>
      : never

type CorrectPosition<V extends number, Arr extends unknown[]> =
  `${V}` extends `-${infer R}`
    ? GetNegativePosition<V, Arr>
    : V

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"],
  PS=CorrectPosition<Start, Arr>,
  PE=CorrectPosition<End, Arr>,
  I extends number[]=[],
  R extends unknown[] = [],
  Flag extends boolean = PS extends I['length'] ? true : false
> =
  I["length"] extends PE
    ? R
    : Arr extends [infer F, ...infer Rest]
      ? Flag extends true
        ? Slice<Rest, Start, End, PS, PE, [...I, 1], [...R, F], true>
        : Slice<Rest, Start, End, PS, PE, [...I, 1]>
    : R
