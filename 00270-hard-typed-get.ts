// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}


// ============= Your Code Here =============
type Get<T extends Record<string, any>, K extends string, prefix extends string = ''> =
  K extends `${infer F}.${infer Rest}`
    ? Get<T[`${prefix extends '' ? '' : `${prefix}.`}${F}`], Rest> extends never
      ? Get<T, Rest, prefix extends '' ? F : `${prefix}.${F}`>
      : Get<T[`${prefix extends '' ? '' : `${prefix}.`}${F}`], Rest>
    : `${prefix extends '' ? '' : `${prefix}.`}${K}` extends keyof T ? T[`${prefix extends '' ? '' : `${prefix}.`}${K}`] : never
