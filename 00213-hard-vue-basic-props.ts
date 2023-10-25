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

type P1 = {
  propA: {};
  propB: {
      type: StringConstructor;
  };
  propC: {
      type: BooleanConstructor;
  };
  propD: {
      type: typeof ClassA;
  };
  propE: {
      type: (StringConstructor | NumberConstructor)[];
  };
  propF: RegExpConstructor;
}

type IBase<T> =
  T extends { (value?: any): infer V } ? V
    : T extends new (...args: any) => infer C
      ? C
      : never

type IUnionBase<T> = T extends T ? IBase<T> : never

type IGetProps<T> = {
  [P in keyof T]:
    T[P] extends { type: infer V }
      ? V extends any[]
        ? IUnionBase<V[number]>
        : IBase<V>
      : T[P] extends { (value?: any): infer E }
        ? E
        : any
}


type IOption<P, D, C, M> = {
  props: P,
  data: (this: IGetProps<P>) => D,
  computed: C & ThisType<D>
  methods: M & ThisType<IGetProps<P> & D & M & { [P in keyof C]: C[P] extends (...args: any) => infer R ? R : never }>
}

declare function VueBasicProps<P, D, C, M>(options: IOption<P, D, C, M>): any
