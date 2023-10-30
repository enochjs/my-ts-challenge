// ============= Test Cases =============
import type { Equal, Expect, ExpectExtends } from './test-utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
  Equal<
  ObjectKeyPaths<{
    refCount: number
    person: { name: string; age: number }
  }>,
  'refCount' | 'person' | 'person.name' | 'person.age'
  >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>, false>>,
]


// ============= Your Code Here =============

// type GetArrKey<P extends string> = `${P}.${number}` | `${P}[${number}]` | `${P}.[${number}]`
// type GetKey<P extends string> = P extends '' ? never : P
// type GetKeyT<P extends string, T> =`${P}${P extends '' ? '' : '.'}${T extends string ? T : ''}`

// type ObjectKeyPathsArr<T, P extends string, R = never> =
//   T extends (infer V)[]
//     ? V extends any[]
//       ? GetArrKey<P> | ObjectKeyPathsArr<V, GetArrKey<P>>
//       : V extends Record<string, any>
//         ? GetArrKey<P> | ObjectKeyPaths<V, GetArrKey<P>>
//         : GetArrKey<P>
//     : never

// type ObjectKeyPaths<T extends object, P extends string = '',  U extends keyof T = keyof T> =
//   U extends U
//     ? T[U] extends any[]
//       ? GetKey<P> | GetKeyT<P, U> | ObjectKeyPathsArr<T[U], GetKeyT<P, U>>
//       : T[U] extends Record<string, any>
//         ? GetKey<P> | ObjectKeyPaths<T[U], GetKeyT<P, U>>
//         : GetKey<P> | GetKeyT<P, U>
//     : never

type ObjectKeyPaths<T, K extends keyof T = keyof T & (string | number)> =
  | K
  | (K extends string | number
        ? T[K] extends object
          ? `${K}${ObjectKeyPaths<T[K]> extends infer L extends string | number
                ? `.${L}` | (L extends number ? `${'.' | ''}[${L}]` : never)
                : never}`
          : never
        : never);