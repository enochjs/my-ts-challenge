// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

// ============= Your Code Here =============

type IsIndexSignature<Index> = string extends Index
    ? never
    : number extends Index
      ? never
      : symbol extends Index
        ? never
        : Index;


type RemoveIndexSignature<T> = {
  [P in keyof T as IsIndexSignature<P> extends never ? never : P]: T[P]
}

// type aa<T> = T extends { [key: PropertyKey]: any } ? never : 
type aaa = IsIndexSignature<Bar>