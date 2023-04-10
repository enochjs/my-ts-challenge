// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]


// ============= Your Code Here =============

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type IsAny<T> = 0 extends 1 & T ? true : false
type MyEqual1<X, Y> =
  IsAny<X> extends true
    ? IsAny<Y> extends true
      ? true
      : false
    : IsAny<Y> extends true
      ? false
      : [X] extends [Y] ? [Y] extends [X] ? true : false : false


type IndexOf<T extends unknown[], U, C extends number[]=[]> =
  T extends [] ? -1
    : T extends [infer F, ...infer Rest]  
      ? MyEqual1<F, U> extends true
        ? C["length"]
        : IndexOf<Rest, U, [1, ...C]>
      : never

type cc = IndexOf<[string, 1, number, 'a', any], any>