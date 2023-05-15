// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

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
type TupleToObject<T> = T extends [infer P, infer R] ? P extends string ? { [K in P]: R} : never : never
type UnionToIntersectionFn<T> = (T extends any ? (args: () => T) => any : never) extends (args: infer R) => any ? R : never
type GetLast<T> = UnionToIntersectionFn<T> extends () => infer R ? R : never
type MergeType<T> = {
  [P in keyof T]: T[P]
}

type ObjectFromEntries<T, U = T, R = unknown> =
MergeType<[T] extends [never]
    ? R
    : U extends T
      ? R & TupleToObject<GetLast<T>> & ObjectFromEntries<Exclude<T, GetLast<T>>>
      : never>
