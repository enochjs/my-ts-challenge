// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]


// ============= Your Code Here =============
type IsRequiredKey<T, K extends keyof T, U = K> =
  [K] extends [never]
    ? true
    : U extends K
      ? Omit<T, U> extends T
        ? false
        : IsRequiredKey<T, Exclude<K, U>>
      : never
