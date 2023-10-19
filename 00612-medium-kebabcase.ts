// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============

type IsUppercase<T extends string> =
  T extends Uppercase<T>
    ? T extends Lowercase<T>
      ? false
      : true
    : false;

type KebabCase<S, R extends string = ''> =
  S extends `${infer F}${infer Rest}`
    ? IsUppercase<F> extends true
      ? R extends ''
        ? KebabCase<Rest, Lowercase<F>>
        : KebabCase<Rest, `${R}-${Lowercase<F>}`>
    : KebabCase<Rest, `${R}${F}`>
  : R
    