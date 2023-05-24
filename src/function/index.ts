
interface Animal {
  name: string
}

interface Dog extends  Animal {
  bark: () => void
}

interface Cat extends Animal {
  sound: () => void
}



declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;

type DogIsSubtypeAnimal = Dog extends Animal ? true : false   //  Dog <: Animal
type PAnimalIsSubtypePDog = typeof f1 extends typeof f2 ? true : false  // Fn<Animal> <: Fn<Dog>

f1 = f2;  // f1 <: f2, 只能赋值等于或者更小的集合
f2 = f1; // Ok
f2 = f3; // Error


interface Comparer1<T> {
  compare: (a: T, b: T) => number;
}
declare let animalComparer1: Comparer1<Animal>;
declare let dogComparer1: Comparer1<Dog>;
animalComparer1 = dogComparer1; // Error
dogComparer1 = animalComparer1; // Ok

// a1.compare()
// interface Comparer<T> {
//   compare: (a: T, b: T) => number;
// }
interface Comparer<T> {
  compare(a: T, b: T): number;
}
declare let animalComparer: Comparer<Animal>;
declare let dogComparer: Comparer<Dog>;
animalComparer = dogComparer; // Ok because of bivariance
dogComparer = animalComparer; // Ok

let a: Comparer<Animal> = {
  compare(a, b) {
    return 1
  },
}



function combine<T>(...funcs: ((x: T) => void)[]): (x: T) => void {
  return x => {
    for (const f of funcs) f(x);
  };
}
function animalFunc(x: Animal) {}
function dogFunc(x: Dog) {}
let combined = combine(animalFunc, dogFunc); // (x: Dog) => void


interface Hello {
  foo: () => void
  bar(): void
}

interface Hello {
  foo: (type: number) => void
  bar(type: string) :void
}