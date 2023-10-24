// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============

type ICurrying<T, F extends boolean = false> = T extends (...args: infer P) => infer R
  ? P extends [infer F, ...infer Rest]
    ? (x: F) => ICurrying<(...args: Rest) => R, true>
    : F extends true ? R : () => R
  : never

declare function Currying<T>(fn: T): ICurrying<T>
