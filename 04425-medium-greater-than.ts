// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]


// ============= Your Code Here =============
// 
// type MinusOne<T, C extends number[] = []> = T extends [1, ...C]["length"] ? C["length"] : MinusOne<T, [1, ...C]>

type NumberToString<T extends number> = `${T}` extends infer R extends string ? R : ''

type StringToRevertArr<T extends string, C extends string[] = []> = T extends `${infer F}${infer Rest}` ? StringToRevertArr<Rest, [F, ...C]> : C

type MinusValueMap = { '9': '8', '8': '7', '7': '6', '6': '5', '5': '4', '4': '3', '3':'2', '2': '1', '1': '0', '0': '9' }

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

type MinusOne<T extends number> = T extends 1 ? 0 : T extends 0 ? -1 : ToNumber<StringArrToString<ClearPreZero<RevertArr<MinusStringArr< StringToRevertArr<NumberToString<T>>>>>>>


type Length<T extends any[]> = T["length"];

type GreaterThan<A extends number, B extends number, N extends any[] = []> = Length<N> extends A
  ? false
  : Length<N> extends B
  ? true
  : GreaterThan<A, B, [...N, any]>;