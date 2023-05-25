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


type LargerThan<X extends number, Y extends number, C extends number[] = []> =
  C["length"] extends X
    ? false
    : C["length"] extends Y
      ? true
      : LargerThan<X, Y, [...C, 1]>

type MinIndex<T extends number[], R extends number = 0, U extends number[] = T, Index extends number[] = []> = 
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? MinIndex<Rest, LargerThan<U[R], F> extends true ? Index["length"] : R, U, [...Index, 1]>
    : R

// type a = MinIndex<[1, 33, 23, 3, 333]>
type SortOne<T extends number[], I extends number = MinIndex<T>,  FI=T[I], C extends number[] =[],  R extends number[]=[]> =
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? C["length"] extends I
      ? SortOne<Rest, I, FI, [...C, 1], R>
      : SortOne<Rest, I, FI, [...C, 1], [...R, F]>
    : FI extends number ? [FI, R] : []


type aa = SortOne<[133, 33, 23, 3, 333]>

type ReverseArr<T extends number[], R extends number[]=[]> = 
  T extends [infer F extends number, ...infer Rest extends number[]]
    ? ReverseArr<Rest, [F, ...R]>
    : R


type Sort<T extends number[], N extends boolean=false, R extends number[] = []> = 
  SortOne<T> extends [infer F extends number, infer Rest extends number[]]
    ? Sort<Rest, N, [...R, F]>
    : N extends true ? ReverseArr<R> : R
