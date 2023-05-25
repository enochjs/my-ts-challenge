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
type ISW<T extends string> = Uppercase<T> extends Lowercase<T> ? false : true
type CamelCase<S extends string, R extends string = '', P extends string = ''> =
  S extends `${infer F}${infer Rest}`
    ? P extends '_'
      ? CamelCase<Rest, `${R}${ISW<F> extends true ? Uppercase<F> : `_${F extends '_' ? '' : F}`}`, F>
      : CamelCase<Rest, `${R}${F extends '_' ? '' : Lowercase<F>}`, F>
    : P extends `_` ? `${R}${P}` : R