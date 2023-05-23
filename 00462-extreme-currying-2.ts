// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]


// ============= Your Code Here =============

// type GetRest<T extends unknown[], Index, C extends number[] = [], R extends unknown[] = [], Flag extends boolean = C['length'] extends Index ? true : false> =
//   T extends [infer F, ...infer Rest]
//   ? GetRest<Rest, Index, [...C, 1], Flag extends true ? [...R, F] : R, Flag extends false ? [...C, 1]["length"] extends Index ? true : false : true>
//   : R


// type GetPre<T extends unknown[], Index, R extends unknown[]=[]> =
//   R["length"] extends Index
//     ? R
//     : T extends [infer F, ...infer Rest]
//       ? GetPre<Rest, Index, [...R, F]>
//       : R

// type GenPR<T extends unknown[], R = never, Temp extends unknown[] = [], Index extends unknown[] = [1],  U extends unknown[] = T> =
//   T extends [infer F, ...infer Rest]
//     ? Temp["length"] extends Index["length"]
//       ? GenPR<U, R | [GetPre<U, Index["length"]>, GetRest<U, Index["length"]>], [], [...Index, 1], U>
//       : GenPR<Rest, R, [...Temp, F], Index, U>
//     : R | [GetPre<U, Index["length"]>, GetRest<U, Index["length"]>]

// type a = GenPR<[string, number, boolean]>

// type GenPRWithRes<T extends unknown[], R, U=GenPR<T>,> =
//     U extends U
//       ? U extends [infer Pre extends any[], infer Rest extends any[]]
//         ? (...args: Pre) => IDynamicParamsCurrying<(...args: Rest) => R>
//         : never
//       : never
      
// type ccc1 = IDynamicParamsCurrying<(...args: [boolean]) => boolean>

// type IDynamicParamsCurrying<T extends (...args: any) => any> =
//   T extends (...args: infer P) => infer R
//     ? P['length'] extends 0 ? R : P["length"] extends 1 ? (...args: P) => R : GenPRWithRes<P, R>
//     : never

// type cc = typeof curried1;

declare function DynamicParamsCurrying<T extends (...args: any) => any>(fn: T): T extends (...args: infer P) => infer R ? Currying<P, R> : never

type Currying<P, R> =
  P extends [infer F, ...infer Rest]
    // 惊天妙手，返回一个泛型函数 
    ? <T extends any[]>(...args: T) => Currying<P extends [...T, ...infer Rest] ? Rest : never, R>
    : R


