// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]


// ============= Your Code Here =============
type OptionalKeys<T, U extends keyof T = keyof T> = U extends U ? Omit<T, U> extends T ? U : never : never
