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

type UnionInclude<T, U> =
  [U] extends [never]
    ? true
    : Equal<T extends T ? Equal<T, U> extends true ? true : never : never, never> extends true ? false : true

type FilterOut<T extends any[], U, R extends any[]=[]> = 
  T extends [infer F, ...infer Rest]
    ? UnionInclude<U, F> extends true
      ? FilterOut<Rest, U, R>
      : FilterOut<Rest, U, [...R, F]>
    : R
