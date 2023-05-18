// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

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

type CapitalizeArr<T> =
  T extends [infer F, ...infer Rest]
    ? F extends any[]
      ? [CapitalizeArr<F>, ...CapitalizeArr<Rest>]
      : [CapitalizeNestObjectKeys<F>, ...CapitalizeArr<Rest>]
    : []


type CapitalizeNestObjectKeys<T> = {
  [P in keyof T as P extends string ? Capitalize<P> : P]:
    T[P] extends any[]
      ? CapitalizeArr<T[P]>
      : T[P] extends Record<string, any>
        ? CapitalizeNestObjectKeys<T[P]>
      : T[P]
}
