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
      count: 6,
    }
    included: true
  }
  'foo.baz': false
  'foo.bar.test.a': 2
  hello: 'world'
}


// ============= Your Code Here =============
type Get<T, K extends string, Pre extends string =''> =
  K extends ''
    ? T
    // 包含点
    : K extends `${Pre}${infer F}.${infer Rest}`
      ? T extends { [P in F]: infer Res }
        // 包含点能找不到
        ? Get<Res, Rest> extends never
          // 继续找T 
          ? Get<T, Rest, `${F}.`>
          // 找到了
          : Get<Res, Rest>
        : Get<Data, Rest, `${F}.`>
      // 走到最后了
      : T extends { [P in K]: infer Res }
        ? Res
        : T extends { [P  in `${Pre}${K}`]: infer Res }
          ? Res
          : never

type ee = Get<Data, 'foo.bar.test.a'>