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


type IsUpperCase<T extends string> = Uppercase<T> extends T ? Lowercase<T> extends T ? false : true : false
// ============= Your Code Here =============

// type KebabCase<S extends string, isFirst extends boolean = true> = 
//   S extends `${infer F}${infer Rest}` ?
//     IsUpperCase<F> extends true ?
//       isFirst extends true ? `${Lowercase<F>}${KebabCase<Rest, false>}` : `-${Lowercase<F>}${KebabCase<Rest, false>}`
//     : `${F}${KebabCase<Rest, false>}`
//   : ''

type KebabCase<S> = S extends `${infer U}${infer V}${infer Rest}`
  ? true extends IsUpperCase<V>
    ? `${Lowercase<U>}-${KebabCase<`${Lowercase<V>}${Rest}`>}`
    : `${Lowercase<U>}${KebabCase<`${V}${Rest}`>}`
  : S