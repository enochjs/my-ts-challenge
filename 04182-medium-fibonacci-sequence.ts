// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============

type NumberToString<T extends number> = `${T}` extends infer R extends string ? R : ''

type StringToRevertArr<T extends string, C extends string[] = []> = T extends `${infer F}${infer Rest}` ? StringToRevertArr<Rest, [F, ...C]> : C

type MinusValueMap = { '8': '9', '7': '8', '6': '7', '5': '6', '4': '5', '3':'4', '2': '3', '1': '2', '0': '1', '9': '0' }

type MinusStringArr<T> =
  T extends [infer F, ...infer Rest]
    ? F extends keyof MinusValueMap
      ? MinusValueMap[F] extends '9' ? ['9', ...MinusStringArr<Rest>] : [MinusValueMap[F], ...Rest]
      : never
    : never

type RevertArr<T extends unknown[]> = T extends [infer F, ...infer Rest] ? [...RevertArr<Rest>, F] : []

type ClearPreZero<T extends unknown[]> = T extends [infer F, ...infer Rest] ? F extends '0' ? ClearPreZero<Rest> : T : never

type StringArrToString<T extends unknown[], S extends string = ''> = 
  T extends [infer F, ...infer Rest] ? `${S}${F extends string ? F : ''}${StringArrToString<Rest>}` : S

type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never

type AddOne<T extends number> = T extends 0 ? 1 : ToNumber<StringArrToString<ClearPreZero<RevertArr<MinusStringArr< StringToRevertArr<NumberToString<T>>>>>>>


type Fibonacci<T extends number, C extends number = 3, Pre extends number[] = [1], PrePre extends number[]=[1]> =
  T extends 1 ? 1 :
   T extends 2 ? 1 :
    [T] extends [C] ? [...Pre, ...PrePre]["length"] : Fibonacci<T, AddOne<C>, [...Pre, ...PrePre], Pre>