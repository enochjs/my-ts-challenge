// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]

type PickKeyByType<T, U, P extends keyof T = keyof T> =  P extends keyof T ? T[P] extends U ? P : never : never

// type aa = PickKeyByType<Model, boolean>

// ============= Your Code Here =============
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}

// type aa = PickByType<Model, boolean>