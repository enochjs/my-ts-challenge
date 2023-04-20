// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
// type GetRequired<T> = any

// type GetRequired<T> = {
//   [P in keyof T as Omit<T,P> extends T ? never : P]: T[P]
// }


// type a = {foo: number; bar?: string}

// type b = {foo: number;}

// type c = b extends a ? true : false

// Required optional undefined => never
type GetRequired<T> = {
  [K in keyof T as undefined extends T[K] ? (T[K] extends undefined ? K : never) : K]-?: T[K]
} extends infer R
  ? { [K in keyof R as Equal<R[K], never> extends true ? never : K]: R[K] }
  : never

// 
type v = { foo: undefined; bar?: undefined }
type c1 = Required<v>

type cc1 = { bar?: undefined }

type cc2 = undefined extends cc1["bar"] ? ( cc1['bar'] extends undefined ? 1 : 2) : 3