// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============

type Number2String<T extends string | number> = `${T}`
type RevereString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? RevereString<Rest, `${F}${R}`> : R

type IsPalindrome<T extends string | number, O extends string = Number2String<T>, R = RevereString<O>> =
  O extends `${infer OF}${infer ORest}`
    ? R extends `${infer RF}${infer RRest}`
      ? OF extends RF
        ? IsPalindrome<T, ORest, RRest>
        : false
      : false
    : true
