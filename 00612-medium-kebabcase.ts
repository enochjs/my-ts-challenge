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

type IsUpcase<T extends string> =
  Uppercase<T> extends Lowercase<T>
    ? false
    : T extends Uppercase<T>
      ? true
      : false

type KebabCase<S, B extends boolean = true> =
  S extends `${infer F}${infer Rest}`
    ?  IsUpcase<F> extends true
      ? `${B extends true ? Lowercase<F> : `-${Lowercase<F>}`}${KebabCase<Rest, false>}`
      : `${F}${KebabCase<Rest, false>}`
    : ''
