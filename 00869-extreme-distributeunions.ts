// ============= Test Cases =============
import type { Equal, Expect, Merge } from './test-utils'

type cases = [
  // Already distributed unions should stay the same:
  Expect<Equal<DistributeUnions<1>, 1>>,
  Expect<Equal<DistributeUnions<string>, string>>,
  Expect<Equal<DistributeUnions<1 | 2>, 1 | 2>>,
  Expect<Equal<DistributeUnions<'b' | { type: 'a' } | [1]>, 'b' | { type: 'a' } | [1]>>,
  // tuples:
  Expect<Equal<DistributeUnions<[1 | 2, 3]>, [1, 3] | [2, 3]>>,
  Expect<Equal<DistributeUnions<[1 | 2, 'a' | 'b']>, [1, 'a'] | [1, 'b'] | [2, 'a'] | [2, 'b']>>,
  Expect<
  Equal<
  DistributeUnions<[1 | 2, 'a' | 'b', false | true]>,
  | [1, 'a', false]
  | [1, 'a', true]
  | [1, 'b', false]
  | [1, 'b', true]
  | [2, 'a', false]
  | [2, 'a', true]
  | [2, 'b', false]
  | [2, 'b', true]
  >
  >,
  // objects
  Expect<
  Equal<
  DistributeUnions<{ x: 'a' | 'b'; y: 'c' | 'd' }>,
  { x: 'a'; y: 'c' } | { x: 'a'; y: 'd' } | { x: 'b'; y: 'c' } | { x: 'b'; y: 'd' }
  >
  >,
  Expect<
  Equal<
  DistributeUnions<{ type: 'a'; value: number | string } | { type: 'b'; value: boolean }>,
  | { type: 'a'; value: string }
  | { type: 'a'; value: number }
  | { type: 'b'; value: false }
  | { type: 'b'; value: true }
  >
  >,
  Expect<
  Equal<
  DistributeUnions<
  | {
    type: 'a'
    option: { kind: 'none' } | { kind: 'some'; value: 'x' | 'y' }
  }
  | { type: 'b'; msg: string }
  >,
  | { type: 'b'; msg: string }
  | { type: 'a'; option: { kind: 'none' } }
  | { type: 'a'; option: { kind: 'some'; value: 'x' } }
  | { type: 'a'; option: { kind: 'some'; value: 'y' } }
  >
  >,
  // mixed structures:
  Expect<
  Equal<
  DistributeUnions<[false | true, { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
  | [false, { value: 'a' }, { x: { y: 2 } }]
  | [false, { value: 'a' }, { x: { y: 3 } }]
  | [false, { value: 'b' }, { x: { y: 2 } }]
  | [false, { value: 'b' }, { x: { y: 3 } }]
  | [true, { value: 'a' }, { x: { y: 2 } }]
  | [true, { value: 'a' }, { x: { y: 3 } }]
  | [true, { value: 'b' }, { x: { y: 2 } }]
  | [true, { value: 'b' }, { x: { y: 3 } }]
  >
  >,
  Expect<
  Equal<
  DistributeUnions<17 | [10 | { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
  | 17
  | [10, { x: { y: 2 } }]
  | [10, { x: { y: 3 } }]
  | [{ value: 'a' }, { x: { y: 2 } }]
  | [{ value: 'a' }, { x: { y: 3 } }]
  | [{ value: 'b' }, { x: { y: 2 } }]
  | [{ value: 'b' }, { x: { y: 3 } }]
  >
  >,
]


// ============= Your Code Here =============
type HelperArr<V, T extends unknown[]> = V extends V ? [V, ...DistributeUnionsArr<T>] : never

type DistributeUnionsArr<T extends unknown[]> =
  T extends [infer F, ...infer Rest]
    ? HelperArr<DistributeUnions<F>, Rest>
    : []

type HelpObj<K, V> = V extends V ? { [P in K & string]: V } : never

type DistributeUnionsObj<T extends object, K extends keyof T = keyof T> =
  [K] extends [never]
    ? {}
    : K extends K 
      ? HelpObj<K, DistributeUnions<T[K]>> & DistributeUnionsObj<Omit<T, K>>
      : never

type DistributeUnions<T> =
  T extends unknown[]
    ? DistributeUnionsArr<T>
    : T extends object
      ? Merge<DistributeUnionsObj<T>>
      : T
