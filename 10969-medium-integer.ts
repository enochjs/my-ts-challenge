// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]


// ============= Your Code Here =============

type Num = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type ToNumber<T extends string> = T extends `${infer R extends number}` ? R : never

type ToString<T> = T extends string | number ? `${T}` : never
type StringToTuple<T, C extends unknown[] = []> = T extends '' ? C : T extends `${infer F}${infer R}` ? StringToTuple<R, [...C, F]> : never

type IntegerTuple<T extends unknown[], C extends unknown[] = []> =
  T extends [] ? C :
    T extends [infer F extends string, ...infer R]
      ? F extends Num
        ? IntegerTuple<R, [...C, F]>
        : never
      : never

type TupleToString<T extends unknown[], R extends string = ''> = T extends [] ? R : T extends [infer F extends string, ...infer Rest] ? TupleToString<Rest, `${R}${F}`> : never

type Integer<T> = ToNumber<TupleToString<IntegerTuple<StringToTuple<ToString<T>>>>>
