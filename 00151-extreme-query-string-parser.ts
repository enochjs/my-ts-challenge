// ============= Test Cases =============
import type { Equal, Expect, Merge } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]


// ============= Your Code Here =============
type Include<X, Y> =
  X extends Y
    ? true
    : X extends [infer F, ...infer Rest]
      ? F extends Y
        ? true
        : Include<Rest, Y>
      : false

type MergeTK<T, K extends string, V> =
  K extends keyof T
    ? Include<T[K], V> extends true
      ? T
      : T[K] extends any[]
        ? Merge<Omit<T, K> & Record<K, [...T[K], V]>>
        : Merge<Omit<T, K> & Record<K, [T[K], V]>>
    : Merge<T & Record<K, V>>

type ParseQueryString<T extends string, R extends Record<string, any> = {}> =
  T extends `${infer F}&${infer Rest}`
    ? F extends `${infer K}=${infer V}`
      ? ParseQueryString<Rest, MergeTK<R, K, V>>
      : ParseQueryString<Rest, MergeTK<R, F, true>>
    : T extends `${infer K}=${infer V}`
      ?  MergeTK<R, K, V>
      : T extends ''
        ? R
        : MergeTK<R, T, true>
