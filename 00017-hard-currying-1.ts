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

type ICurrying<T, Flag=false> =
  T extends (...args: infer P) => infer R
    ? P extends [infer F, ...infer Rest]
      ? (x: F) => ICurrying<(...args: Rest) => R, true>
      : Flag extends true ? R : () => R
    : never
declare function Currying<T>(fn: T): ICurrying<T>


type ICurrying1<T extends (...args: any) => any, Flag=false> =
  T extends (...args: infer P) => infer R
    ? P extends [infer F, ...infer Rest]
      ? (x: F) => ICurrying<(...args: Rest) => R, true>
      : Flag extends true ? R : () => R
    : never

// 奇怪的现象
declare function Currying1<T extends (...args: any) => any>(fn: T): ICurrying1<T>

// return boolean
const curried11 = Currying1((a: string, b: number, c: boolean) => true)
// return true
const curried0 = Currying((a: string, b: number, c: boolean) => true)