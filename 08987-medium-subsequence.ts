// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]


// ============= Your Code Here =============

type Tuple2Union<T extends unknown[]> = T[number]

// 去除tuple中的一个类型
type TupleExclude<T extends unknown[], U, R extends unknown[] = []> =
  T extends [infer F, ...infer Rest]
    ? Equal<F, U> extends true
      ? [...R, ...Rest]
      : TupleExclude<Rest, U, [...R, F]>
    : never

// 运算 [1,2,3] => [1,2], [1,3], [2,3]
type Sub1<T extends unknown[], U = Tuple2Union<T>, E = U> = U extends E ? TupleExclude<T, U>  : never

// 递归
type Sub2<T extends unknown[]> = Sub1<T> | (T extends [infer F, ...infer R] ? (Sub1<R> | [F]) : never)

type Subsequence<T extends unknown[]> = T | Sub2<T> | []
