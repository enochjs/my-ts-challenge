
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

declare function Currying1<T extends (...args: any) => any>(fn: T): ICurrying1<T>

// return true
const curried = Currying((a: string, b: number, c: boolean) => 1)
// return boolean
const curried1 = Currying1((a: string, b: number, c: boolean) => 1)
