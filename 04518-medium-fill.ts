// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

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





type MinusValueMap1 = { '8': '9', '7': '8', '6': '7', '5': '6', '4': '5', '3':'4', '2': '3', '1': '2', '0': '1', '9': '0' }

type MinusStringArr1<T> =
  T extends [infer F, ...infer Rest]
    ? F extends keyof MinusValueMap1
      ? MinusValueMap1[F] extends '9' ? ['9', ...MinusStringArr1<Rest>] : [MinusValueMap1[F], ...Rest]
      : never
    : never

type AddOne<T extends number> = T extends 0 ? 1 : ToNumber<StringArrToString<ClearPreZero<RevertArr<MinusStringArr1< StringToRevertArr<NumberToString<T>>>>>>>


type LargerOrEqualThan<V extends number, C extends number> =  C extends 0 ? true : V extends 0 ? false : LargerOrEqualThan<MinusOne<V>, MinusOne<C>>


// ============= Your Code Here =============
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Index extends number = 0,
> = T extends [infer F, ...infer Rest] ? [LargerOrEqualThan<Index, Start> extends true ? LargerOrEqualThan<End,  AddOne<Index>> extends true ? N : F : F,  ...Fill<Rest,N, Start, End, AddOne<Index>>  ] : []
