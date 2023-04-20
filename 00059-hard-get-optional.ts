// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>>,
]


// ============= Your Code Here =============
// type GetOptional<T> = {
//   [P in keyof T as Omit<T, P> extends T ? P : never]: T[P]
// }

type GetOptional<T> =
  { [P in keyof T as undefined extends T[P] ? P : never]: T[P] } extends infer R
    ? { [P in keyof R as Equal<Required<R>[P], undefined> extends true ? never : P]?: R[P] } 
    : never

