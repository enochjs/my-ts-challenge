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
type GenFn<T, R extends Function | string = string> =
  T extends [infer F, ...infer Rest]
    ? GenFn<Rest, (d: F) => R>
    : R

type Format<T extends string, R extends (string | number)[] = [], Pre extends string = ''> =
  T extends `${infer F}${infer Rest}`
    ? Pre extends '%'
      ? F extends '%'
        ? Format<Rest, R, ''>
        : F extends 'd' | 's'
          ? Format<Rest, [F extends 'd' ? number : string, ...R], ''>
          : Format<Rest, R, ''>
      : Format<Rest, R, F>
    : GenFn<R>

