// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============

type ABC = 'abcdefghijklmnopqrstuvwxyz'

type StringToUnion<T, R extends string[] = []> = T extends `${infer F}${infer Rest}` ? StringToUnion<Rest, [...R, F]> : R[number]

type UnitABC = StringToUnion<Uppercase<ABC> | ABC>

type CamelCase<S extends string, R extends string = '', UppercaseFlag extends boolean = false> =
  S extends `${infer F}${infer Rest}`
    ? F extends UnitABC
      ? UppercaseFlag extends true
        ? CamelCase<Rest, `${R}${Uppercase<F>}`, false>
        : CamelCase<Rest, `${R}${Lowercase<F>}`, false>
      : F extends '_'
        ? CamelCase<Rest, R, true>
        : CamelCase<Rest, `${R}${F}`, false>
    : R