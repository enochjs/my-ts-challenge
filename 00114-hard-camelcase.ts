// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
type IsLetter<S extends string> = Uppercase<S> extends Lowercase<S> ? false : true 
type CamelCase<S extends string, R extends string = '', C extends boolean = false> =
  S extends `${infer F}${infer Rest}`
    ? IsLetter<F> extends true
      ? C extends true
        ? CamelCase<Rest, `${R}${Uppercase<F>}`>
        : CamelCase<Rest, `${R}${Lowercase<F>}`>
      : F extends '_'
        ? C extends true
          ? CamelCase<Rest, `${R}_`, true>
          : CamelCase<Rest, R, true>
        : C extends true
          ? CamelCase<Rest, `${R}_${F}`>
          : CamelCase<Rest, `${R}${F}`>
    : C extends true
      ? `${R}_`
      : R
