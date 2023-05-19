// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

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

type Include<R, T> =
  R extends [infer F, ...infer Rest]
    ? Equal<F, T> extends true
      ? true
      : Include<Rest, T>
    : false

type MergeValue<R, T> =
  R extends any[]
    ? Include<R, T> extends true
      ? R
      : [...R, T]
    : Equal<R, T> extends true
      ? T
      : unknown extends R ? T : [R, T] 
  
type ParseOne<S extends string, R extends Record<string, any>> =
  S extends `${infer K}=${infer V}`
    ? Omit<R, K> & {
        [P in K]: MergeValue<R[K], V>
      }
    : Omit<R, S> &  {
      [P in S]: MergeValue<R[S], true>
    }

type MergeType<T> = {
  [P in keyof T]: T[P]
}

type ParseQueryString<K extends string, R extends Record<string, any> = {}> =
  MergeType<K extends `${infer F}&${infer Rest}`
    ? ParseQueryString<Rest, ParseOne<F, R>>
    : K extends ''
      ? R
      : ParseOne<K, R>>