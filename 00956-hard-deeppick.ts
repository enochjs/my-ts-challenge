// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

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
type DeepPickOne<T extends Record<string, any>, K extends string> =
  K extends `${infer Pre}.${infer Suffix}`
    ? { [P in Pre]: DeepPickOne<T[Pre], Suffix> }
    : K extends '' ? unknown : { [P in K]: T[K] }

type UnionToIntersectionFn<T> = (T extends any ? (args: () => T) => any : never) extends (args: infer R) => any ? R : never

type GetLast<T> = UnionToIntersectionFn<T> extends () => infer R ? R : never

type UnionToTuple<T, R extends unknown[] = []> = [T] extends [never] ? R : UnionToTuple<Exclude<T, GetLast<T>>, [GetLast<T>, ...R]>

type DeepPickTuple<T extends Record<string, any>, K extends string, U = K> = UnionToTuple<K extends U ? () => DeepPickOne<T, K> : never>

type DeepPickTupleToIntersection<T extends any[], R = unknown> =
  T extends [infer F, ...infer Rest]
    ? F extends () => infer Res
      ? DeepPickTupleToIntersection<Rest, R & Res>
      : R
    : R

// type DeepPick<T extends Record<string, any>, K extends string> = DeepPickTupleToIntersection<DeepPickTuple<T, K>>


type DeepPick<T extends Record<string,any>, U extends string> = (
  U extends string
    ? U extends `${infer F}.${infer R}`
      ? (arg: { [K in F]: DeepPick<T[F], R> }) => void
      : U extends keyof T
        ? ( arg: Pick<T, U>) => void
        : (arg: unknown) => void
    : never
  ) extends (arg:infer Z)=>void? Z:never;