// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]


// ============= Your Code Here =============
type Format2Arr<T extends string, R extends (string | number)[] = []> =
  T extends `${infer F}%%${infer Rest}`
    ? Format2Arr<Rest, R>
    : T extends `${infer F1}%${infer V}${infer Rest1}`
      ? Format2Arr<Rest1, [...R, V extends 's' ? string : number]>
      : R

type Format<O extends string, T = Format2Arr<O>, R = string> =
  T extends [...infer P, infer V]
    ? Format<O, P, (x: V) => R>
    : R
