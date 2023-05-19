// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]


// ============= Your Code Here =============
type UnionToInterSectionFn<T> = (T extends any ? (args: () => T) => any : never) extends (args: infer R) => any ? R : never

type GetLast<T> = T extends () => infer R ? R : never

type IsUnionToArr<T, R extends unknown[] = []> =
  [T] extends [never]
    ? R["length"] extends 1 ? false : true
    : IsUnionToArr<Exclude<T, GetLast<UnionToInterSectionFn<T>>>, [...R, GetLast<UnionToInterSectionFn<T>>]>

type NumberToString<T extends number> = `${T}`

type IsNegativeNumber<T extends number> =
  IsUnionToArr<T> extends true
    ? never
    : number extends T
      ? never
      : NumberToString<T> extends `-${infer R}`
        ? true
        : false

