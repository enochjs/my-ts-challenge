// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]


// ============= Your Code Here =============
type StringToNumber<T> = T extends `${infer R extends number}` ? R : never
type LargerOrEqualThan<X extends number, Y extends number, R extends number[] = []> =
  X extends R["length"]
    ? Y extends R["length"] ? true : false
    : Y extends R["length"]
      ? true
      : LargerOrEqualThan<X, Y, [...R, 1]>


type IsBetween<T extends string, S extends number, E extends number> =
  LargerOrEqualThan<StringToNumber<T>, S> extends true
    ? LargerOrEqualThan<E, StringToNumber<T>> extends true
      ? true
      : false
    : false

type GetStringIndex<S, I, R extends string[] = []> =
  S extends `${infer F}${infer Rest}`
    ? I extends R['length']
      ? F
      : GetStringIndex<Rest, I, [...R, F]>
    : never

type ValidDateByIndex<T extends string, Index, Pre extends string = '', M extends string = ''> =
  Index extends 0
    // 月份第一位
    ? IsBetween<T, 0, 1>
    : Index extends 1
      // 月份第二位
      ? Pre extends '0' ? IsBetween<T, 1, 9> : IsBetween<T, 0, 2>
      // 日期第一位
      : Index extends 2
        ? M extends '02' ? IsBetween<T, 0, 2> :  IsBetween<T, 0, 3>
        // 日期第二位
        : Index extends 3
          ? Pre extends '0' 
            ? IsBetween<T, 1, 9>
            : Pre extends '1'
              ? IsBetween<T, 0, 9>
              : Pre extends '2'
                ? M extends '02' ? IsBetween<T, 0, 8> : IsBetween<T, 0, 9>
                : Pre extends '3'
                  ? IsBetween<T, 0 , 1>
                  : never
          : never

type ValidDate<T extends string, C extends string[] = [], Pre extends string = '', S extends string = T> =
  LargerOrEqualThan<C["length"], 5> extends true
    ? false
    : T extends `${infer F}${infer Rest}`
      ? ValidDateByIndex<F, C['length'], Pre, `${GetStringIndex<S, 0>}${GetStringIndex<S, 1>}`> extends true
        ? ValidDate<Rest, [...C, F], F, S>
        : false
      : C["length"] extends 4 ? true : false 
