// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]


// ============= Your Code Here =============

type ABC = 'abcdefghijklmnopqrstuvwxyz'

type StringToUnion<T, R extends string[] = []> = T extends `${infer F}${infer Rest}` ? StringToUnion<Rest, [...R, F]> : R[number]

type UnitABC = StringToUnion<ABC>


type CapitalizeWords<S extends string, R extends string = '', Flag extends boolean = true> =
  S extends ''
  ? R
  : S extends `${infer F}${infer Rest}`
    ? F extends UnitABC
      ? Flag extends true
        ? CapitalizeWords<Rest, `${R}${Capitalize<F>}`, false>
        : CapitalizeWords<Rest, `${R}${F}`, false>
      : CapitalizeWords<Rest, `${R}${F}`, true>
    : never
