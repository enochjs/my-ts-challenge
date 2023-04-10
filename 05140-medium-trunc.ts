// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]


// ============= Your Code Here =============

type NumberToString<T extends number | string> = `${T}`

type Trunc<T extends number | string, R extends string = ''> =
  NumberToString<T> extends ''
    ? R
    : NumberToString<T> extends `${infer F}${infer Rest}` ?
      F extends '.'
        ? R :
        Trunc<Rest, `${R}${F}`>
      : never 
