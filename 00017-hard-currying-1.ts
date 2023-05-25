// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true as const)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true as const)
const curried3 = Currying(() => true as const)

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
type ICurrying<T extends (...args: any) => any, Flag=false> =
  T extends (...args: infer P) => infer R
    ? P extends [infer F, ...infer Rest]
      ? (x: F) => ICurrying<(...args: Rest) => R, true>
      : Flag extends true ? R : () => R
    : never

declare function Currying<T extends (...args: any) => any>(fn: T): ICurrying<T>
