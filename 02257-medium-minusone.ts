// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============


type MinusMap = {
  '0': '9',
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8',
}


type ReverseString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R

type String2Number<T> = T extends `${infer T extends number}` ? T : never
type Number2String<T extends number> = `${T}`


/**
 * 1. 将数值反转， 如 100 => 001
 * 2. 01 -1 => 90 => 清空最后的0
 * 3. 001 -1 => 990 => 清空最后的0
 * 4. 0[2-9] => 9[1-8]
 * 5. 00[2-9] => 99[1-8]
 * 6. [1-9] => [0-8]
 */

type MinusReverse<T extends string, ClearLastZero = false> =
  T extends `${infer F}${infer Rest}`
    ? F extends '0'
      ? `9${MinusReverse<Rest, true>}`
      : F extends '1'
        ? ClearLastZero extends true 
          ? ''
          : `0${Rest}`
      : `${F extends keyof MinusMap ? MinusMap[F] : never}${Rest}`
   : never 

type MinusOne<T extends number> = T extends 0 ? -1 : String2Number<ReverseString<MinusReverse<ReverseString<Number2String<T>>>>>

