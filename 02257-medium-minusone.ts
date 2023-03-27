// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============

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



