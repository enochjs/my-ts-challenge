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

type GetFn<T extends string[], R = string> = 
  T extends [infer F, ...infer Rest extends string[]]
    ? GetFn<Rest, (x: F extends 's' ? string : number) => R>
    : R

type Format<T extends string, R extends string[] = []> =
  T extends `${infer Pre}%${infer Rest}`
    ? Rest extends `${infer F}${infer R1}`
      ? F extends 's' | 'd'
        ? Format<R1, [F, ...R]>
        : Format<R1, R>
      : GetFn<R>
    : GetFn<R>