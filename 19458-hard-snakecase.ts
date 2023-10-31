// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]


// ============= Your Code Here =============

type IsUpcase<T extends string> = T extends Uppercase<T> ? true : false

type SnakeCase<T extends string, R extends string = ''> =
  T extends `${infer F}${infer Rest}`
    ? F extends Uppercase<F>
      ? SnakeCase<Rest, `${R}_${Lowercase<F>}`>
      : SnakeCase<Rest, `${R}${F}`>
    : R
