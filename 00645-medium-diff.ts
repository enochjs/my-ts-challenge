// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

// ============= Your Code Here =============
type PickDiffKey<U, T> = U extends T ? never : U
type DiffKey<O, O1> = PickDiffKey<O, O1> | PickDiffKey<O1, O>
// type Diff<O, O1> = {
//   [P in DiffKey<keyof O, keyof O1>]: P extends keyof O
//     ? O[P]
//     : P extends keyof O1
//     ? O1[P]
//     : never
// }

type Diff<O, O1> = {
  [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: (O1 & O)[P]
}
