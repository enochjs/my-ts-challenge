// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]


// ============= Your Code Here =============
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type MutableKeys<T, U extends keyof T = keyof T, E = U> =
  U extends E
    ? Omit<T, U> extends T
      ? MyEqual<Pick<T, U>, { readonly [P in U]?: T[P] }> extends true
        ? never
        : U
      : MyEqual<Pick<T, U>, { readonly [P in U]: T[P] }> extends true
        ? never
        : U
    : never
  