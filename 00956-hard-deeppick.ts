// ============= Test Cases =============
import type { Equal, Expect, Merge } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============

type GenValue<T extends string[], V> = 
  T extends [...infer Pre extends string[], infer L extends string]
    ? GenValue<Pre, {[P in L]: V }>
    : V

type PickOne<T, U extends string, P extends string[] = []> =
  U extends `${infer F}.${infer Rest}`
    ? F extends keyof T
      ? PickOne<T[F], Rest, [...P, F]>
      : never
    : U extends keyof T
      ? GenValue<[...P, U], T[U]>
      : never

type Union2Intersection<T> = (T extends T ? (args: T) => any : never) extends (args: infer R) => any ? R : never 

type DeepPick<T, U extends string> =
  Union2Intersection<U extends U
      ? PickOne<T, U>
      : never>

