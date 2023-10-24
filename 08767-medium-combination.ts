// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============

type Arr2Union<T extends string[]> = T[number]
type Permutation<T extends string, U extends string = T> =[T] extends [never] ? never :  T extends U ? [Permutation<Exclude<U, T>>] extends [never] ? T : `${T} ${Permutation<Exclude<U, T>>}` : never
type CombinationUnion<T extends string, U extends string = T> = T extends U ? Permutation<U> | CombinationUnion<Exclude<U, T>> : never

type Combination<T extends string[]> = CombinationUnion<Arr2Union<T>>
