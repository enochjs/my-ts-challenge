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

type SplitData<S> = 
  S extends `${infer A}${infer B}${infer C}${infer D}${infer Rest}`
    ? Rest extends '' ? [`${A}${B}`, `${C}${D}`] : never
    : never

type Number2Arr<T extends number, R extends unknown[] = []> =
  R['length'] extends T
    ? R
    : Number2Arr<T, [...R, 1]>

type String2Number<S extends string | number> = S extends `${infer T extends number}` ? T : never
  
type LargeOrEqualThan<A extends number, B extends number, C=Number2Arr<A>, D=Number2Arr<B>> =
  C extends [infer C1, ...infer CRest]
    ? D extends [infer D1, ...infer DRest]
      ? LargeOrEqualThan<A, B, CRest, DRest>
      : true
    : D extends []
      ? true
      : false


type LargeM = `0${1 | 3 | 5 | 7 | 8}` | '10' | '12'
type LittleM = '02'

type CompareMonth<A extends number | string> = LargeOrEqualThan<12, String2Number<A>>
type CompareDate<D extends number | string, M> =
  D extends '00'
    ? false
    : M extends LargeM
      ? LargeOrEqualThan<31, String2Number<D>>
      : M extends LittleM
        ? LargeOrEqualThan<28, String2Number<D>>
        : LargeOrEqualThan<30, String2Number<D>>

type ValidDate<T extends string, D extends string[]=SplitData<T>> =
  [D] extends [never]
    ? false
    : CompareMonth<D[0]> extends true
      ? CompareDate<D[1], D[0]>
      : false
