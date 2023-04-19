// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


// ============= Your Code Here =============

// For a given infer type variable V, if any candidates were inferred from co-variant positions, the type inferred for V is a union of those candidates.
// 协变 co-variant => union (并集)
// Otherwise, if any candidates were inferred from contra-variant positions, the type inferred for V is an intersection of those candidates. 
// 逆变 contra-variant => intersection (交集)
// Otherwise, the type inferred for V is never.

type UnionToIntersection<T> = (T extends any ? (args: T) => any : never) extends (args: infer R) => any ? R : never


// 转为函数的参数
type T1<T> = T extends any ? (x: T) => any : never

// Distributive 分发 =>  ((x: true) => any) | ((x: 42) => any) | ((x: "foo") => any)
type T2 = T1<'foo' | 42 | true>

// 函数参数为逆变 => 'foo' & 42 & true => never
type T3 = T2 extends (args: infer R) => any ? R : never  // function parameter is 




type Format320 = { urls: { format320p: string } }
type Format480 = { urls: { format480p: string } }
type Format720 = { urls: { format720p: string } }
type Format1080 = { urls: { format1080p: string } }

type Video = {} & (
  Format320 | Format480 | Format720 | Format1080
)

// FormatKeys = never
type FormatKeys = keyof Video["urls"]

// But I need a string representation of all possible
// Video formats here!
declare function selectFormat(format: FormatKeys): void

type UnitFormatKeys = keyof UnionToIntersection<Video['urls']>
declare function selectFormat(format: UnitFormatKeys): void
