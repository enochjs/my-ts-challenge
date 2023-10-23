// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]


// ============= Your Code Here =============
type Join<T, U extends string | number, R extends string = ''> =
  T extends [infer F extends string, ...infer Rest]
    ? Join<Rest, U, R extends '' ? F : `${R}${U}${F}`>
    : R