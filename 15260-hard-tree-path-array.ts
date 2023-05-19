// ============= Test Cases =============
import type { ExpectExtends, ExpectFalse, ExpectTrue } from './test-utils'

declare const example: {
  foo: {
    bar: {
      a: string
    }
    baz: {
      b: number
      c: number
    }
  }
}

type cases = [
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['bar']>, ['a']>>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['baz']>, ['b'] | ['c'] >>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']>, ['bar'] | ['baz'] | ['bar', 'a'] | ['baz', 'b'] | ['baz', 'c']>>,
  ExpectFalse<ExpectExtends<Path<typeof example['foo']['bar']>, ['z']>>,
]


// ============= Your Code Here =============
type Path<T , Pre extends string[] = [], K extends keyof T = keyof T> =
  K extends string
    ? [...Pre, K] | (T[K] extends Record<string, any> ? Path<T[K], [...Pre, K]> : never)
    : never