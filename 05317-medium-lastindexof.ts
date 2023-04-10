// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]


// ============= Your Code Here =============

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2 ) ? true : false


type LastIndexOf<T extends unknown[], U, R extends unknown[] = T> =
  T extends []
    ? -1
    : T extends [...infer Pre, infer L]
      ? MyEqual<L, U> extends true
        ? R extends [infer F, ...infer Rest] ? Rest['length'] : never
        : LastIndexOf<Pre, U,   R extends [infer F, ...infer Rest] ? Rest : never>
      : never
