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
type MergeType<T> = {
  [P in keyof T]: T[P]
}

type Include<X, Y> =
  Equal<X, Y> extends true
    ? true
    : X extends [infer F, ...infer Rest]
      ? Equal<F, Y> extends true ? true : Include<Rest, Y>
      : false

type ParseOne<T extends string, R> = 
  T extends '' ? R :
    T extends `${infer K}=${infer V}`
      ? K extends keyof R
        ? Omit<R, K> & {
          [P in K]: Include<R[P], V> extends true ? R[P] : R[P] extends string | true ? [R[P], V] : R[P] extends any[] ? [...R[P], V] : never
        }
        : R & { [P in K]: V }
      : T extends keyof R
        ? Omit<R, T> & {
          [P in T]:  Include<R[P], true> extends true ? R[P] : R[P] extends string | true ? [R[P], true] : R[P] extends any[] ? [...R[P], true] : never
        }
        : R & { [P in T]: true }

type ParseQueryString<T extends string, R extends Record<string, string | boolean | (string | boolean)[]> = {}> =
  T extends `${infer Item}&${infer Rest}`
    ? ParseQueryString<Rest, ParseOne<Item, R>>
    : MergeType<ParseOne<T, R>>