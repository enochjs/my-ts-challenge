// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})


// ============= Your Code Here =============

type GetTypeFromConstructor<T> =
  T extends any[] ?
    GetTypeFromConstructor<T[number]>
    : T  extends () => infer C // String/Number/Boolean
      ? C
        : T extends new (...args: any) => infer R
          ? R
          : T extends {}
            ? any
            : T

type GetProps<T> = {
  [P in keyof T]: T[P] extends { type: infer R } ?  GetTypeFromConstructor<R> : GetTypeFromConstructor<T[P]>
}

type ReturnComputed<C> = {
  [P in keyof C]: C[P] extends (...args: any) => infer R ? R : never
}

type Options<P, D, C, M> = {
  props: P,
  data: (this: GetProps<P>) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<D & M & GetProps<P> & ReturnComputed<C>>
}

declare function VueBasicProps<P, D, C, M>(options: Options<P, D, C, M>): any
