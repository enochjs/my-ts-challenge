// noEmitOnError
// 一般来说即使有类型错误，ts还是会将文件变异为js，当设置noEmitOnError，则不会将ts编译成js

function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date}!`);
}

// tsc --noEmitOnError 
// greet("Brendan");

greet('brenDan', new Date())

// noImplicitAny
// strictNullChecks