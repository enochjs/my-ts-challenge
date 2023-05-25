// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

SimpleVue({
  data() {
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
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})


// ============= Your Code Here =============

type GetComputedValue<M> = {
  [P in keyof M]: M[P] extends (...args: any) => any ? ReturnType<M[P]> : never
}

type IOption<S, C, M> = {
  data(this: never): S
  computed: C & ThisType<S>
  methods: M & ThisType<S & GetComputedValue<C> & M>
}

declare function SimpleVue<S, C, M>(options: IOption<S, C, M>): any
