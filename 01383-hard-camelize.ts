// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

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

type CamelizeKey<T> =
  T extends `${infer P}_${infer R}`
    ? `${P}${CamelizeKey<Capitalize<R>>}`
    : T

type CamelizeArr<T> = T extends [infer F, ...infer R] ? [Camelize<F>, ...CamelizeArr<R>] : []

type Camelize<T> = {
  [P in keyof T as CamelizeKey<P>]:
    T[P] extends string
      ? T[P]
      : T[P] extends any[] ? CamelizeArr<T[P]>
      : Camelize<T[P]>
}
