// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>


// ============= Your Code Here =============
type GetMiddleElement<T extends unknown[], C extends unknown[] = []> =
  T extends []
    ? []
    : T extends [infer F, ...infer Rest]
      ? Rest["length"] extends C['length']
        ? [F]
        : Rest["length"] extends [...C , 1]["length"]
          ? [F, Rest[0]]
          : GetMiddleElement<Rest, [...C, 1]>
      : never
    
