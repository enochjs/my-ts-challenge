// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
type MergeOne<T> = {
  [P in keyof T]: T[P]
}

type Merge<F, S> = MergeOne<{
  [P in keyof F as P extends keyof S ? never : P]: F[P]
} & S>
