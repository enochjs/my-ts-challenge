// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs, CaseTypeOne>>,
]


// ============= Your Code Here =============
type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

// 实现 Combs

type SubsequenceL<T extends unknown[], L extends unknown[]> = 
  T["length"] extends L["length"]
    ? T
    : T extends [infer F, ...infer Rest]
      ? L extends [infer LF, ...infer LRest]
        ? [F, ...SubsequenceL<Rest, LRest>] | SubsequenceL<Rest, L>
        : []
      : []
type a = SubsequenceL<ModifierKeys, [1,2]>

type ArrayToString<T> = T extends T ? T extends [infer A extends string, infer B extends string] ? `${A} ${B}` : never : never


type Combs = ArrayToString<SubsequenceL<ModifierKeys, [1,2]>>