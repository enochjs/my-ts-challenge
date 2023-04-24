// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], number | never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]


// ============= Your Code Here =============
type MyInclude<T, V, U = T> = 
  T extends U
    ? Equal<T, V> extends true
      ? true
      : never
    : never

type FilterOut<T extends any[], V, R extends any[] = []> =
  T extends [infer F, ...infer Rest]
    ? [F] extends [never]
      ? FilterOut<Rest, V, R>
      : Equal<MyInclude<V, F>, true> extends true
        ? FilterOut<Rest, V, R>
        : FilterOut<Rest, V, [...R, F]>
    : R

