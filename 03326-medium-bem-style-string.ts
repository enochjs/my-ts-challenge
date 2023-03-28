// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============
type ArrayToUnin<T extends string[]> = T[number]

type BEMONE<B extends string, E extends string, C extends string, B1=B, E1 = E> =
  B extends B1 ?
    [E] extends [never] ? B :
    E extends E1 ? `${B}${C}${E}` : never
  : never

type BEM<B extends string, E extends string[], M extends string[]> = BEMONE<BEMONE<B, ArrayToUnin<E>, '__'>, ArrayToUnin<M>, '--'>