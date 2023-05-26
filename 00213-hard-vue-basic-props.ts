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
    
    // type a = PropsType[""]

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

type GetValueType<T, U=T> = T extends U ? T extends { (value?: any): infer R } ? R : T extends {new (...args: any): infer C} ? C : T : never

type GetProps<T> = {
  [P in keyof T]: Equal<T[P], {}> extends true ? any : T[P] extends { type: infer R } ? R extends any[] ? GetValueType<R[number]> : GetValueType<R> : GetValueType<T[P]>
}

type GetComputed<T> = {
  [P in keyof T]: T[P] extends (...args: any) => infer R ? R : never
}

type IOption<P, D, C, M> = {
  readonly props: P,
  data: (this: GetProps<P>) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<GetComputed<C> & GetProps<P> & M>

}

// ============= Your Code Here =============
declare function VueBasicProps<P, D, C, M>(options: IOption<P, D, C ,M>): any
