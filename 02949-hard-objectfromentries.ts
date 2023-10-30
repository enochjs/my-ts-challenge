// ============= Test Cases =============
import type { Equal, Expect, Merge } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


// ============= Your Code Here =============
type UnionFromEntries<T> =
  T extends T
    ? T extends [infer Key extends PropertyKey, infer Value]
      ? Record<Key, Value>
      : never
    : never

type Union2InterSection<T> = (T extends T ?  (args: T) => any : never) extends (args: infer R) => any ? R : never

type ObjectFromEntries<T> = Merge<Union2InterSection<UnionFromEntries<T>>>
