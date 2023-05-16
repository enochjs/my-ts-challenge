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
type StringOrNumberToArr<T, R extends string[] = []> =
  T extends number
    ? StringOrNumberToArr<`${T}`, R>
    : T extends `${infer F}${infer Rest}`
      ? StringOrNumberToArr<Rest, [...R, F]>
      : R

type IsPalindromeArr<T extends string[]> =
  T extends [infer F, ...infer Rest extends string[], infer L]
    ? Equal<F, L> extends true 
      ? IsPalindromeArr<Rest>
      : false
    : true

type IsPalindrome<T> = IsPalindromeArr<StringOrNumberToArr<T>>