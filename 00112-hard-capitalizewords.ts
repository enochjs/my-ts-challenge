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

type IsLetter<S extends string> = Uppercase<S> extends Lowercase<S> ? false : true

type CapitalizeWords<S extends string, R extends string = '', C extends boolean = true> =
  S extends `${infer F}${infer Rest}`
    ? IsLetter<F> extends true
      ? C extends true 
        ? CapitalizeWords<Rest, `${R}${Uppercase<F>}`, false>
        : CapitalizeWords<Rest, `${R}${F}`, false>
      : CapitalizeWords<Rest, `${R}${F}`, true>
    : R
