// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111',
    test: [1, boolean, {name: 3}]
  }
  hobbies: ['sing', 'dance']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string,
    test: [number, boolean, { name: number }]
  }
  hobbies: [string, string]
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============

type PrimitiveBasic<T> =
  T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : never

type IsBasicType<T> = T extends string | number | symbol | boolean ? true : false

type ToPrimitive<T> =
  IsBasicType<T> extends true
    ? PrimitiveBasic<T>
    : T extends unknown[]
      ? T extends [infer F, ...infer Rest]
        ? ToPrimitive<Rest> extends unknown[]
          ? [ToPrimitive<F>, ...ToPrimitive<Rest>]
          : never
        : T 
      : { [P in keyof T]: ToPrimitive<T[P]> }
