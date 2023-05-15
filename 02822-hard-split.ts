// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]


// ============= Your Code Here =============
type Split<S extends string, SEP extends string, R extends string[] = []> =
  Equal<S, string> extends true
    ? string[]
    : S extends `${infer Pre}${SEP}${infer Rest}`
      ? Split<Rest, SEP, [...R, Pre]>
      : S extends ''
        ? SEP extends ''
          ? R
          : R["length"] extends 0
            ? ['']
            :
          R
        : [...R, S]
