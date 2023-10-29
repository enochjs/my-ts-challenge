// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]


// ============= Your Code Here =============

type RequiredAll<T, K extends keyof T> =
  K extends K
    ? Partial<Pick<T, K>> extends Pick<T, K>
      ? false
      : true
    : never
type IsRequiredKey<T, K extends keyof T> = RequiredAll<T, K> extends true ? true : false
