// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============

type Tuple2Union<T extends unknown[]> = T[number]

type Permutation<T, R extends string = '', U = T> =
  [T] extends [never] ? R : T extends U ? Permutation<Exclude<U, T>, R extends '' ? `${T extends string ? T : ''}` : `${R} ${T extends string ? T : ''}`> : 3 

type PermutationAll<T, U = T> = T extends U ? Permutation<U> | PermutationAll<Exclude<U, T>> : never

type Combination<T extends string[]> = PermutationAll<Tuple2Union<T>>
