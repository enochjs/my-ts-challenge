// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]


// ============= Your Code Here =============

type unionToIntersectionFn<T> = (T extends any ? (args: () => T) => any : never) extends (args: infer R) => any ? R : never
type GetLast<T> = unionToIntersectionFn<T> extends () => infer R ? R : never
type unionToArr<T, R extends unknown[]=[]> =
  [T] extends [never] ? R : unionToArr<Exclude<T, GetLast<T>>, [...R, GetLast<T>]>
type Include<X, Y> = [Y] extends [never] ? true : X extends [infer F, ...infer Rest] ? Equal<F, Y> extends true ? true : Include<Rest, Y> : false

type FilterOut<T extends any[], U, A = unionToArr<U>,  R extends unknown[]=[]> =
  T extends [infer F, ...infer Rest]
    ? Include<A, F> extends true
      ? FilterOut<Rest, U, A, R>
      : FilterOut<Rest, U, A, [...R, F]>
    : R

