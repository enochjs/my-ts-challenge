// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]


// ============= Your Code Here =============
type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type MapToUnion<T, P = keyof T, R = never> = P extends keyof T ? R | T[P] : never

type ParsePrintFormat<T, R extends Array<MapToUnion<ControlsMap>> = [],  Flag extends boolean = false> =
  T extends `${infer F}${infer Rest}`
    ? Flag extends true
      ? F extends keyof ControlsMap
        ? ParsePrintFormat<Rest, [...R, ControlsMap[F]], false>
        : ParsePrintFormat<Rest, R, false>
      : ParsePrintFormat<Rest, R, F extends '%' ? true : false>
    : R