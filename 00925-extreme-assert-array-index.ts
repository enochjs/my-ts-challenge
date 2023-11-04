// ============= Test Cases =============
const matrix = [
  [3, 4],
  [5, 6],
  [7, 8],
]

assertArrayIndex(matrix, 'rows')

let sum = 0

for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
  const columns: number[] = matrix[i]

  const x: number[] = matrix[0]

  assertArrayIndex(columns, 'columns')

  for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
    sum += columns[j]

    const y: number = columns[i]

    const z: number = columns[0]

    const u: number[] = matrix[j]
  }
}

const a: string[] = []

assertArrayIndex(a, 'a')

for (let p = 0 as Index<typeof a>; p < a.length; p += 1) {
  const value: string = a[p]

  const z: string = a[2]
}

a.push('qux')
// @ts-expect-error: number is not assignable to string
a.push(3)

for (const value of a) {
  const other: string = value
}

const b: number[] = []

assertArrayIndex(b, 'b')

for (let p = 0 as Index<typeof a>; p < b.length; p += 1) {
  // @ts-expect-error: number | undefined is not assignable to string
  const value: string = b[p]
}

const c: string[] = []

assertArrayIndex(c, 'c')

for (let p = 0; p < c.length; p += 1) {
  let value: string = c[p]

  value = c[0 as Index<typeof a>]
}

const d: readonly number[] = []

assertArrayIndex(d, 'd')

for (let p = 0 as Index<typeof d>; p < d.length; p += 1) {
  const value: number = d[p]

  // @ts-expect-error: only permits reading
  d[2] = 3
}

// @ts-expect-error: push does not exist on readonly
d.push(3)

const e: [number] = [0]

// @ts-expect-error: [number] is not assignable to never
assertArrayIndex(e, 'e')

const f: readonly [boolean] = [false]

// @ts-expect-error: [boolean] is not assignable to never
assertArrayIndex(f, 'f')

const tuple = [5, 7] as const

// @ts-expect-error: readonly [5, 7] is not assignable to never
assertArrayIndex(tuple, 'tuple')


// ============= Your Code Here =============
// your answers
type HashMapHelper<T extends number, R extends unknown[] = []> = R['length'] extends T
  ? R
  : HashMapHelper<T, [...R, unknown]>

type HashMap = {
  '0': HashMapHelper<0>
  '1': HashMapHelper<1>
  '2': HashMapHelper<2>
  '3': HashMapHelper<3>
  '4': HashMapHelper<4>
  '5': HashMapHelper<5>
  '6': HashMapHelper<6>
  '7': HashMapHelper<7>
  '8': HashMapHelper<8>
  '9': HashMapHelper<9>
  a: HashMapHelper<1>
  b: HashMapHelper<2>
  c: HashMapHelper<3>
  d: HashMapHelper<4>
  e: HashMapHelper<5>
  f: HashMapHelper<6>
  g: HashMapHelper<7>
  h: HashMapHelper<8>
  i: HashMapHelper<9>
  j: HashMapHelper<10>
  k: HashMapHelper<11>
  l: HashMapHelper<12>
  m: HashMapHelper<13>
  n: HashMapHelper<14>
  o: HashMapHelper<15>
  p: HashMapHelper<16>
  q: HashMapHelper<17>
  r: HashMapHelper<18>
  s: HashMapHelper<19>
  t: HashMapHelper<20>
  u: HashMapHelper<21>
  v: HashMapHelper<22>
  w: HashMapHelper<23>
  x: HashMapHelper<24>
  y: HashMapHelper<25>
  z: HashMapHelper<26>
}

type Hash<T extends string, RR extends unknown[] = []> = T extends `${infer L}${infer R}`
  ? Hash<R, [...RR, ...HashMap[keyof HashMap & L]]>
  : RR['length']

type IsKeyHelper<K extends string> = K extends `${infer L}${infer R}`
  ? L extends keyof HashMap
    ? IsKeyHelper<R>
    : false
  : true

type IsKey<K extends string> = K extends '' ? false : IsKeyHelper<K>

declare const KEY: unique symbol

function assertArrayIndex<A extends readonly unknown[], K extends string>(
  array: number extends A['length'] ? A : never,
  key: IsKey<K> extends true ? K : never,
): asserts array is number extends A['length']
  ? A & { readonly [KEY]: Hash<K> } & {
      readonly [key in Hash<K>]: A[number]
    }
  : never {}

type Index<Array extends { readonly [KEY]: number }> = Array[typeof KEY]