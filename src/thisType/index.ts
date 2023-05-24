
// this
interface MyType {
  extend<T>(other: T): this & T;
}


let V3: MyType = {
  extend: function (other) {
    return {
      ...this,
      ...other,
    }
  }
}

const result = V3.extend({ name: '124'}).extend({ test: 124 }).extend({ name: 125 })


