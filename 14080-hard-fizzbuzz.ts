// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ['1']>>,
  Expect<Equal<FizzBuzz<5>, ['1', '2', 'Fizz', '4', 'Buzz']>>,
  Expect<Equal<FizzBuzz<20>, [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
    '16',
    '17',
    'Fizz',
    '19',
    'Buzz',
  ]>>,
  Expect<Equal<FizzBuzz<100>, [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
    '16',
    '17',
    'Fizz',
    '19',
    'Buzz',
    'Fizz',
    '22',
    '23',
    'Fizz',
    'Buzz',
    '26',
    'Fizz',
    '28',
    '29',
    'FizzBuzz',
    '31',
    '32',
    'Fizz',
    '34',
    'Buzz',
    'Fizz',
    '37',
    '38',
    'Fizz',
    'Buzz',
    '41',
    'Fizz',
    '43',
    '44',
    'FizzBuzz',
    '46',
    '47',
    'Fizz',
    '49',
    'Buzz',
    'Fizz',
    '52',
    '53',
    'Fizz',
    'Buzz',
    '56',
    'Fizz',
    '58',
    '59',
    'FizzBuzz',
    '61',
    '62',
    'Fizz',
    '64',
    'Buzz',
    'Fizz',
    '67',
    '68',
    'Fizz',
    'Buzz',
    '71',
    'Fizz',
    '73',
    '74',
    'FizzBuzz',
    '76',
    '77',
    'Fizz',
    '79',
    'Buzz',
    'Fizz',
    '82',
    '83',
    'Fizz',
    'Buzz',
    '86',
    'Fizz',
    '88',
    '89',
    'FizzBuzz',
    '91',
    '92',
    'Fizz',
    '94',
    'Buzz',
    'Fizz',
    '97',
    '98',
    'Fizz',
    'Buzz',
  ]>>,
]


// ============= Your Code Here =============
type ConstructTuple<
  T extends number,
  N extends unknown[] = []
> = N["length"] extends T ? N : ConstructTuple<T, [...N, unknown]>;

// 数学理论，所有位数总和 / 3 => 0 则能被3 整除
type RemainderWhenDividedBy3<T, R extends 0 | 1 | 2 = 0 > =
  T extends `${infer I}${0 | 3 | 6 | 9}`
    ? RemainderWhenDividedBy3<I, R>
      : T extends `${infer I}${1 | 4 | 7}`
      ? RemainderWhenDividedBy3<I, [1, 2, 0][R]>
      : T extends `${infer I}${2 | 5 | 8}`
        ? RemainderWhenDividedBy3<I, [2, 0, 1][R]>
        : R;

type FizzBuzzOrNumber<T> = RemainderWhenDividedBy3<T> extends 0
  ? T extends `${string}${"0" | "5"}`
    ? "FizzBuzz"
    : "Fizz"
  : T extends `${string}${"0" | "5"}`
    ? "Buzz"
    : T;

type FizzBuzz<
  T extends number,
  L extends unknown[] = [...ConstructTuple<T>, unknown]
> = {
  [K in keyof L]: FizzBuzzOrNumber<`${K}`>;
} extends [unknown, ...infer I]
  ? I
  : never;
