// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}


// ============= Your Code Here =============
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends ((<T>() => T extends Y ? 1 : 2)) ? true : false
type GetReadonlyKeys<T, U extends keyof T = keyof T> = U extends U ? MyEqual<{ [P in U]: T[P] }, { readonly [P in U]: T[P] }> extends true ? U : never : never
