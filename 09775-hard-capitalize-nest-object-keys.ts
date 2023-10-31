// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
type CapitalizeNestArrayKeys<T, R extends unknown[] = []> =
  T extends [infer F, ...infer Rest]
    ? F extends any[]
      ? CapitalizeNestArrayKeys<Rest, [...R, CapitalizeNestArrayKeys<F>]>
      : F extends Record<string, any>
        ? CapitalizeNestArrayKeys<Rest, [...R, CapitalizeNestObjectKeys<F>]>
        : CapitalizeNestArrayKeys<Rest, [...R, F]>
    : R

type CapitalizeNestObjectKeys<T> = {
  [P in keyof T as P extends string ? Capitalize<P>: P]:
    T[P] extends any[]
      ? CapitalizeNestArrayKeys<T[P]>
      :T[P] extends Record<string, any>
        ? CapitalizeNestObjectKeys<T[P]>
        : T[P]
}

type a = CapitalizeNestObjectKeys<foo>