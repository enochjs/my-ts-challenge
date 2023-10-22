// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
type Chunk<T extends any[], C extends number, R extends any[] = [], Temp extends any[] = []> =
  T extends [infer F, ...infer Rest]
    ? [...Temp, F]['length'] extends C
      ? Chunk<Rest, C, [...R, [...Temp, F]], []>
      : Chunk<Rest, C, R, [...Temp, F]>
    : Temp extends []
      ? R
      : [...R, Temp]
