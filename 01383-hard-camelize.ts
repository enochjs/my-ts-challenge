// ============= Test Cases =============
import type { Equal, Expect, Merge } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type CamelizeString<T extends string, R extends string = '', Flag extends boolean = false> =
  T extends `${infer Pre}_${infer V}${infer Rest}`
    ? CamelizeString<Rest, `${R}${Pre}${Uppercase<V>}`, true>
    : Flag extends true
      ? `${R}${T}`
      : T

type CamelizeArr<T, R extends unknown[] = []> =
  T extends [infer F, ...infer Rest]
    ? CamelizeArr<Rest, [...R, Camelize<F>]>
    : R

type Camelize<T> = 
  {
    [P in keyof T as P extends string ? CamelizeString<P> : P]:
    T[P] extends any[]
      ? CamelizeArr<T[P]>
      : T[P] extends Record<string, any>
        ? Camelize<T[P]>
        : T[P]
      
  }
