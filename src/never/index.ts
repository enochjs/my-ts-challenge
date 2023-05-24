function error(message: string): never {
  throw new Error(message);
}
// Inferred return type is never
function fail() {
  return error("Something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {}
}

// Inferred return type is number
function move1(direction: "up" | "down") {
  switch (direction) {
    case "up":
      return 1;
    case "down":
      return -1;
  }
  return error("Should never get here");
}
// Inferred return type is number
function move2(direction: "up" | "down") {
  return direction === "up"
    ? 1
    : direction === "down"
    ? -1
    : error("Should never get here");
}
// Inferred return type is T
function check<T>(x: T | undefined) {
  return x || error("Undefined value");
}

// Because never is assignable to every type, a function returning never can be used when a callback returning a more specific type is required:
function test(cb: () => string) {
  let s = cb();
  return s;
}
test(() => "hello");
test(() => fail());
test(() => {
  throw new Error();
});


