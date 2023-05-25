// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
type GetRequired<T> = {
  [P in keyof T as Omit<T, P> extends T ? never : P]: T[P]
}
