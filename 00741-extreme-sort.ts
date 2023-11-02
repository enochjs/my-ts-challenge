// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>,
]


// ============= Your Code Here =============

type LargeThan<X extends number, Y extends number, I extends number[] =[]> =
  I['length'] extends X 
    ? false
    : I['length'] extends Y
      ? true
      : LargeThan<X, Y, [...I, 1]>


type GetMin<T extends number[], R extends number[] = [], L extends number[] =[]> =
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? R extends []
      ? GetMin<Rest, [F], L>
      : F extends R[0]
        ? GetMin<Rest, [...R, F], L>
        : LargeThan<R[0], F> extends true
          ? GetMin<Rest, [F], [...L, ...R]>
          : GetMin<Rest, R, [...L, F]>
    : [R, L]

type Sort<T extends number[], Invert extends boolean = false, R extends number[]=[]> =
  T extends []
    ? R
    : GetMin<T> extends [infer V extends number[], infer Rest extends number[]]
      ? Sort<Rest, Invert, Invert extends true ? [...V, ...R] : [...R, ...V]>
      : never