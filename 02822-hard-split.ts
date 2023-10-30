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
type Split<S extends string, SEP extends string, Pre extends string = '', R extends string[] = []> =
  Equal<string, S> extends true
    ? string[]
    : S extends `${infer F}${infer Rest}`
        ? F extends SEP
          ? Split<Rest, SEP, '', [...R, Pre]>
          : SEP extends '' 
            ? Split<Rest, SEP, '', [...R, F]>
            : Split<Rest, SEP, `${Pre}${F}`, R>
        : R extends []
          ? SEP extends ''
            ? []
            : [Pre]
          : Pre extends '' ? R : [...R, Pre]