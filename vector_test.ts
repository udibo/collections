import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertThrows,
  test,
  TestSuite,
} from "./test_deps.ts";
import { MyMath, Thing } from "./test_common.ts";
import { descend, Vector } from "./mod.ts";

const vectorTests: TestSuite<void> = new TestSuite({ name: "Vector" });

test(vectorTests, "empty when initialized", () => {
  let vector: Vector<number> = new Vector();
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 0);

  vector = new Vector(5);
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 5);
});

test(vectorTests, "cannot initialize with invalid capacity", () => {
  assertThrows(
    () => new Vector("5" as unknown as number),
    TypeError,
    "invalid capacity",
  );
  assertThrows(() => new Vector(-1), RangeError, "invalid capacity");
  assertThrows(() => new Vector(6.5), TypeError, "invalid capacity");
  assertThrows(
    () => new Vector(Math.pow(2, 32)),
    RangeError,
    "invalid capacity",
  );
});

const pushTests: TestSuite<void> = new TestSuite({
  name: "push",
  suite: vectorTests,
});

test(pushTests, "up to capacity", () => {
  let vector: Vector<number> = new Vector(1);
  vector.push(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assertEquals(vector.capacity, 1);

  vector = new Vector(2);
  vector.push(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assertEquals(vector.capacity, 2);
  vector.push(12);
  assertEquals([...vector], [11, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(2);
  vector.push(11, 12);
  assertEquals([...vector], [11, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);
});

test(pushTests, "above capacity", () => {
  let vector: Vector<number> = new Vector();
  assertEquals(vector.capacity, 0);
  vector.push(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assert(vector.capacity >= 1);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.push(12);
  assertEquals([...vector], [11, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);
  vector.push(13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11, 12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11, 12, 13, 14, 15);
  assertEquals([...vector], [11, 12, 13, 14, 15]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(pushTests, "up to capacity after pop", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.pop();
  vector.push(12);
  vector.push(13);
  assertEquals([...vector], [12, 13]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(2);
  vector.push(11);
  vector.pop();
  vector.push(12, 13);
  assertEquals([...vector], [12, 13]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);
});

test(pushTests, "above capacity after pop", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.pop();
  vector.push(12, 13);
  vector.push(14);
  assertEquals([...vector], [12, 13, 14]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.pop();
  vector.push(12, 13, 14);
  assertEquals([...vector], [12, 13, 14]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.pop();
  vector.push(12, 13, 14, 15, 16);
  assertEquals([...vector], [12, 13, 14, 15, 16]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(pushTests, "up to capacity after shift", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.push(12);
  vector.push(13);
  assertEquals([...vector], [12, 13]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(2);
  vector.push(11);
  vector.shift();
  vector.push(12, 13);
  assertEquals([...vector], [12, 13]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);
});

test(pushTests, "above capacity after shift", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.push(12, 13);
  vector.push(14);
  assertEquals([...vector], [12, 13, 14]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.push(12, 13, 14);
  assertEquals([...vector], [12, 13, 14]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.push(12, 13, 14, 15, 16);
  assertEquals([...vector], [12, 13, 14, 15, 16]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(pushTests, "up to capacity after unshift", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.push(12);
  assertEquals([...vector], [11, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(3);
  vector.unshift(11);
  vector.push(12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(pushTests, "above capacity after unshift", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.push(12);
  vector.push(13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.push(12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.push(12, 13, 14, 15);
  assertEquals([...vector], [11, 12, 13, 14, 15]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

const unshiftTests: TestSuite<void> = new TestSuite({
  name: "unshift",
  suite: vectorTests,
});

test(unshiftTests, "up to capacity", () => {
  let vector: Vector<number> = new Vector(1);
  vector.unshift(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assertEquals(vector.capacity, 1);

  vector = new Vector(2);
  vector.unshift(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assertEquals(vector.capacity, 2);
  vector.unshift(12);
  assertEquals([...vector], [12, 11]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(3);
  vector.unshift(11);
  vector.unshift(12, 13);
  assertEquals([...vector], [12, 13, 11]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(unshiftTests, "above capacity", () => {
  let vector: Vector<number> = new Vector();
  assertEquals(vector.capacity, 0);
  vector.unshift(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assert(vector.capacity >= 1);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.unshift(12);
  assertEquals([...vector], [12, 11]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);
  vector.unshift(13);
  assertEquals([...vector], [13, 12, 11]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.unshift(12, 13);
  assertEquals([...vector], [12, 13, 11]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.unshift(12, 13, 14, 15);
  assertEquals([...vector], [12, 13, 14, 15, 11]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(unshiftTests, "up to capacity after pop", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.pop();
  vector.unshift(12);
  vector.unshift(13);
  assertEquals([...vector], [13, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(3);
  vector.unshift(11);
  vector.pop();
  vector.unshift(12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 12]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(unshiftTests, "above capacity after pop", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.pop();
  vector.unshift(12, 13);
  vector.unshift(14);
  assertEquals([...vector], [14, 12, 13]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.pop();
  vector.unshift(12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 12]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.unshift(11);
  vector.pop();
  vector.unshift(12);
  vector.unshift(13, 14, 15, 16);
  assertEquals([...vector], [13, 14, 15, 16, 12]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(unshiftTests, "up to capacity after shift", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.unshift(12);
  vector.unshift(13);
  assertEquals([...vector], [13, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(3);
  vector.push(11);
  vector.shift();
  vector.unshift(12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 12]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(unshiftTests, "above capacity after shift", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.unshift(12, 13);
  vector.unshift(14);
  assertEquals([...vector], [14, 12, 13]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.unshift(12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 12]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.shift();
  vector.unshift(12);
  vector.unshift(13, 14, 15, 16);
  assertEquals([...vector], [13, 14, 15, 16, 12]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(unshiftTests, "up to capacity after push", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, 11]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);

  vector = new Vector(3);
  vector.push(11);
  vector.unshift(12, 13);
  assertEquals([...vector], [12, 13, 11]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(unshiftTests, "above capacity after push", () => {
  let vector: Vector<number> = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.unshift(12);
  vector.unshift(13);
  assertEquals([...vector], [13, 12, 11]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.unshift(12, 13);
  assertEquals([...vector], [12, 13, 11]);
  assertEquals(vector.length, 3);
  assert(vector.capacity >= 3);

  vector = new Vector(2);
  assertEquals(vector.capacity, 2);
  vector.push(11);
  vector.unshift(12, 13, 14, 15);
  assertEquals([...vector], [12, 13, 14, 15, 11]);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
});

test(vectorTests, "peekRight/pop", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.peekRight(), undefined);
  assertEquals(vector.pop(), undefined);
  assertEquals(vector.length, 0);
  assertEquals(vector.peekRight(), undefined);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 4);
  assertEquals(vector.peekRight(), 12);
  assertEquals(vector.pop(), 12);
  assertEquals(vector.length, 3);
  assertEquals(vector.peekRight(), 11);
  assertEquals(vector.pop(), 11);
  assertEquals(vector.length, 2);
  assertEquals(vector.peekRight(), 14);
  assertEquals(vector.pop(), 14);
  assertEquals(vector.length, 1);
  assertEquals(vector.peekRight(), 13);
  assertEquals(vector.pop(), 13);
  assertEquals(vector.length, 0);
  assertEquals(vector.peekRight(), undefined);
  assertEquals(vector.pop(), undefined);
  assertEquals(vector.length, 0);
  assertEquals(vector.peekRight(), undefined);
});

test(vectorTests, "peek/shift", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.peek(), undefined);
  assertEquals(vector.shift(), undefined);
  assertEquals(vector.length, 0);
  assertEquals(vector.peek(), undefined);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 4);
  assertEquals(vector.peek(), 13);
  assertEquals(vector.shift(), 13);
  assertEquals(vector.length, 3);
  assertEquals(vector.peek(), 14);
  assertEquals(vector.shift(), 14);
  assertEquals(vector.length, 2);
  assertEquals(vector.peek(), 11);
  assertEquals(vector.shift(), 11);
  assertEquals(vector.length, 1);
  assertEquals(vector.peek(), 12);
  assertEquals(vector.shift(), 12);
  assertEquals(vector.length, 0);
  assertEquals(vector.peek(), undefined);
  assertEquals(vector.shift(), undefined);
  assertEquals(vector.length, 0);
  assertEquals(vector.peek(), undefined);
});

const lengthTests: TestSuite<void> = new TestSuite({
  name: "length",
  suite: vectorTests,
});

test(lengthTests, "set to 0", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11, 12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  vector.length = 0;
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
});

test(lengthTests, "set to invalid value", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
  assertThrows(
    () => vector.length = "5" as unknown as number,
    TypeError,
    "invalid length",
  );
  assertThrows(() => vector.length = -1, RangeError, "invalid length");
  assertThrows(() => vector.length = 6.5, TypeError, "invalid length");
  assertThrows(
    () => vector.length = Math.pow(2, 32),
    RangeError,
    "invalid length",
  );
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
});

test(lengthTests, "set below current length", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11, 12, 13, 14);
  assertEquals([...vector], [11, 12, 13, 14]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 4);
  vector.length = 2;
  assertEquals([...vector], [11, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 4);
});

test(lengthTests, "set below current length after unshift", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 4);
  vector.length = 3;
  assertEquals([...vector], [13, 14, 11]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
});

test(lengthTests, "set above capacity", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11, 12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  vector.length = 5;
  assertEquals([...vector], [11, 12, 13, undefined, undefined]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
});

test(lengthTests, "set above capacity after unshift", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11, 12);
  vector.unshift(13);
  assertEquals([...vector], [13, 11, 12]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  vector.length = 5;
  assertEquals([...vector], [13, 11, 12, undefined, undefined]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
});

test(lengthTests, "set above current length but below capacity", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11);
  assertEquals([...vector], [11]);
  assertEquals(vector.length, 1);
  assertEquals(vector.capacity, 4);
  vector.length = 3;
  assertEquals([...vector], [11, undefined, undefined]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
});

const capacityTests: TestSuite<void> = new TestSuite({
  name: "capacity",
  suite: vectorTests,
});

test(capacityTests, "set to 0", () => {
  const vector: Vector<number> = new Vector(4);
  vector.push(11, 12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  vector.capacity = 0;
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 0);
});

test(capacityTests, "set to invalid value", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
  assertThrows(
    () => vector.capacity = "5" as unknown as number,
    TypeError,
    "invalid capacity",
  );
  assertThrows(() => vector.capacity = -1, RangeError, "invalid capacity");
  assertThrows(() => vector.capacity = 6.5, TypeError, "invalid capacity");
  assertThrows(
    () => vector.capacity = Math.pow(2, 32),
    RangeError,
    "invalid capacity",
  );
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
});

test(capacityTests, "set to length", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12, 13, 14);
  assertEquals([...vector], [11, 12, 13, 14]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 5);
  vector.capacity = 4;
  assertEquals([...vector], [11, 12, 13, 14]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 4);
});

test(capacityTests, "set below length", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12, 13, 14);
  assertEquals([...vector], [11, 12, 13, 14]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 5);
  vector.capacity = 2;
  assertEquals([...vector], [11, 12]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 2);
});

test(capacityTests, "set below length after unshift", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 5);
  vector.capacity = 3;
  assertEquals([...vector], [13, 14, 11]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(capacityTests, "set below current capacity above length", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 5);
  vector.capacity = 4;
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
});

test(
  capacityTests,
  "set below current capacity above length after unshift",
  () => {
    const vector: Vector<number> = new Vector(5);
    vector.push(11, 12);
    vector.unshift(13);
    assertEquals([...vector], [13, 11, 12]);
    assertEquals(vector.length, 3);
    assertEquals(vector.capacity, 5);
    vector.capacity = 4;
    assertEquals([...vector], [13, 11, 12]);
    assertEquals(vector.length, 3);
    assertEquals(vector.capacity, 4);
  },
);

test(
  capacityTests,
  "set below current capacity above length after shift",
  () => {
    const vector: Vector<number> = new Vector(5);
    vector.push(11, 12, 13, 14, 15);
    vector.shift();
    vector.shift();
    assertEquals([...vector], [13, 14, 15]);
    assertEquals(vector.length, 3);
    assertEquals(vector.capacity, 5);
    vector.capacity = 4;
    assertEquals([...vector], [13, 14, 15]);
    assertEquals(vector.length, 3);
    assertEquals(vector.capacity, 4);
  },
);

const shrinkToFitTests: TestSuite<void> = new TestSuite({
  name: "shrinkToFit",
  suite: vectorTests,
});

test(shrinkToFitTests, "below current capacity", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12, 13);
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 5);
  vector.shrinkToFit();
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(shrinkToFitTests, "after unshift", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12);
  vector.unshift(13);
  assertEquals([...vector], [13, 11, 12]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 5);
  vector.shrinkToFit();
  assertEquals([...vector], [13, 11, 12]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(shrinkToFitTests, "after shift", () => {
  const vector: Vector<number> = new Vector(5);
  vector.push(11, 12, 13, 14, 15);
  vector.shift();
  vector.shift();
  assertEquals([...vector], [13, 14, 15]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 5);
  vector.shrinkToFit();
  assertEquals([...vector], [13, 14, 15]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(shrinkToFitTests, "empty", () => {
  const vector: Vector<number> = new Vector(3);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 3);
  vector.shrinkToFit();
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 0);
});

test(shrinkToFitTests, "unchanged", () => {
  const vector: Vector<number> = new Vector(3);
  vector.push(11, 12, 13);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
  vector.shrinkToFit();
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(vectorTests, "get", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.get(-2), undefined);
  assertEquals(vector.get(-1), undefined);
  assertEquals(vector.get(0), undefined);
  assertEquals(vector.get(1), undefined);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.get(-5), undefined);
  assertEquals(vector.get(-4), 13);
  assertEquals(vector.get(-3), 14);
  assertEquals(vector.get(-2), 11);
  assertEquals(vector.get(-1), 12);
  assertEquals(vector.get(0), 13);
  assertEquals(vector.get(1), 14);
  assertEquals(vector.get(2), 11);
  assertEquals(vector.get(3), 12);
  assertEquals(vector.get(4), undefined);
});

test(vectorTests, "set", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.set(0, 11), 11);
  assertEquals(vector.length, 1);
  assertEquals(vector.capacity, 4);
  assertEquals([...vector], [11]);

  assertEquals(vector.set(2, 12), 12);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  assertEquals([...vector], [11, undefined, 12]);

  assertEquals(vector.set(-1, 13), 13);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  assertEquals([...vector], [11, undefined, 13]);

  assertEquals(vector.set(-2, 14), 14);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  assertEquals([...vector], [11, 14, 13]);

  assertEquals(vector.set(-3, 15), 15);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 4);
  assertEquals([...vector], [15, 14, 13]);

  assertEquals(vector.set(4, 16), 16);
  assertEquals(vector.length, 5);
  assert(vector.capacity >= 5);
  assertEquals([...vector], [15, 14, 13, undefined, 16]);

  assertEquals(vector.set(-7, 17), 17);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
  assertEquals([...vector], [17, undefined, 15, 14, 13, undefined, 16]);
});

test(vectorTests, "delete", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(7), undefined);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(4), undefined);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(-5), undefined);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(1), 14);
  assertEquals([...vector], [13, 11, 12]);
  assertEquals(vector.delete(2), 12);
  assertEquals([...vector], [13, 11]);
  assertEquals(vector.delete(1), 11);
  assertEquals([...vector], [13]);
  assertEquals(vector.delete(0), 13);
  assertEquals([...vector], []);
});

test(vectorTests, "values/valuesRight", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);

  assertEquals([...vector.values()], [13, 14, 11, 12]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);

  assertEquals([...vector.valuesRight()], [12, 11, 14, 13]);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);
});

test(vectorTests, "drain", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals([...vector.drain()], [13, 14, 11, 12]);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], []);
});

test(vectorTests, "drainRight", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector.drainRight()], [12, 11, 14, 13]);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], []);
});

test(vectorTests, "reduce", () => {
  const vector: Vector<number> = new Vector(6);
  let expectedIndex = 1;
  function sumReducer(sum: number, cur: number, idx: number): number {
    assertEquals(idx, expectedIndex++);
    return (sum ?? 0) + cur;
  }

  assertThrows(
    () => vector.reduce(sumReducer),
    TypeError,
    "cannot reduce empty vector with no initial value",
  );
  assertEquals(vector.reduce(sumReducer, -8), -8);

  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);

  expectedIndex = 1;
  assertEquals(vector.reduce(sumReducer), 50);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);

  expectedIndex = 0;
  assertEquals(vector.reduce(sumReducer, -8), 42);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);
});

test(vectorTests, "reduceRight", () => {
  const vector: Vector<number> = new Vector(6);
  let expectedIndex = 1;
  function sumReducer(sum: number, cur: number, idx: number): number {
    assertEquals(idx, expectedIndex--);
    return (sum ?? 0) + cur;
  }

  assertThrows(
    () => vector.reduce(sumReducer),
    TypeError,
    "cannot reduce empty vector with no initial value",
  );
  assertEquals(vector.reduce(sumReducer, -8), -8);

  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);

  expectedIndex = 2;
  assertEquals(vector.reduceRight(sumReducer), 50);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);

  expectedIndex = 3;
  assertEquals(vector.reduceRight(sumReducer, -8), 42);
  assertEquals(vector.length, 4);
  assertEquals(vector.capacity, 6);
  assertEquals([...vector], [13, 14, 11, 12]);
});

test(vectorTests, "isEmpty", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.isEmpty(), true);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.isEmpty(), false);
  vector.length = 0;
  assertEquals([...vector], []);
  assertEquals(vector.isEmpty(), true);
});

test(vectorTests, "clear", () => {
  const vector: Vector<number> = new Vector(4);
  assertEquals(vector.isEmpty(), true);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.isEmpty(), false);
  vector.clear();
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
  assertEquals(vector.isEmpty(), true);
  vector.push(11);
  vector.unshift(13);
  assertEquals([...vector], [13, 11]);
  assertEquals(vector.length, 2);
  assertEquals(vector.capacity, 4);
  assertEquals(vector.isEmpty(), false);
});

test(vectorTests, "join", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.join(), "13,14,11,12");
  assertEquals(vector.join(" | "), "13 | 14 | 11 | 12");
});

test(vectorTests, "toString", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.toString(), "13,14,11,12");
});

test(vectorTests, "toLocaleString", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.toLocaleString(), "13,14,11,12");
});

test(vectorTests, "reverse", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.toArray(), [13, 14, 11, 12]);
  let result: Vector<number> = vector.reverse();
  assertStrictEquals(result, vector);
  assertEquals(vector.toArray(), [12, 11, 14, 13]);
  result = vector.reverse();
  assertStrictEquals(result, vector);
  assertEquals(vector.toArray(), [13, 14, 11, 12]);

  vector.push(15);
  assertEquals(vector.toArray(), [13, 14, 11, 12, 15]);
  result = vector.reverse();
  assertStrictEquals(result, vector);
  assertEquals(vector.toArray(), [15, 12, 11, 14, 13]);
  result = vector.reverse();
  assertStrictEquals(result, vector);
  assertEquals(vector.toArray(), [13, 14, 11, 12, 15]);
});

interface VectorTests {
  vector: Vector<number>;
}
function vectorBeforeEach(context: VectorTests): void {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  context.vector = vector;
}

const sliceTests: TestSuite<VectorTests> = new TestSuite({
  name: "slice",
  suite: vectorTests,
  beforeEach: vectorBeforeEach,
});

test(sliceTests, "positive start", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  let result: Vector<number> = vector.slice();
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11, 12]);
  result = vector.slice(0);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11, 12]);
  result = vector.slice(2);
  assert(result instanceof Vector);
  assertEquals([...result], [11, 12]);
  result = vector.slice(3);
  assert(result instanceof Vector);
  assertEquals([...result], [12]);
  result = vector.slice(4);
  assert(result instanceof Vector);
  assertEquals([...result], []);
});

test(sliceTests, "negative start", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  let result: Vector<number> = vector.slice(-6);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11, 12]);
  result = vector.slice(-4);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11, 12]);
  result = vector.slice(-2);
  assert(result instanceof Vector);
  assertEquals([...result], [11, 12]);
  result = vector.slice(-1);
  assert(result instanceof Vector);
  assertEquals([...result], [12]);
});

test(sliceTests, "positive end", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  let result: Vector<number> = vector.slice(0, 6);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11, 12]);
  result = vector.slice(0, 4);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11, 12]);
  result = vector.slice(0, 3);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11]);
  result = vector.slice(1, 3);
  assert(result instanceof Vector);
  assertEquals([...result], [14, 11]);
  result = vector.slice(1, 2);
  assert(result instanceof Vector);
  assertEquals([...result], [14]);
  result = vector.slice(1, 1);
  assert(result instanceof Vector);
  assertEquals([...result], []);
  result = vector.slice(1, 0);
  assert(result instanceof Vector);
  assertEquals([...result], []);
});

test(sliceTests, "negative end", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  let result: Vector<number> = vector.slice(0, -1);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11]);
  result = vector.slice(1, -1);
  assert(result instanceof Vector);
  assertEquals([...result], [14, 11]);
  result = vector.slice(0, -2);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14]);
  result = vector.slice(1, -2);
  assert(result instanceof Vector);
  assertEquals([...result], [14]);
  result = vector.slice(1, -3);
  assert(result instanceof Vector);
  assertEquals([...result], []);
  result = vector.slice(0, -6);
  assert(result instanceof Vector);
  assertEquals([...result], []);
});

test(sliceTests, "negative range", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  let result: Vector<number> = vector.slice(-6, -1);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11]);
  result = vector.slice(-4, -1);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14, 11]);
  result = vector.slice(-3, -1);
  assert(result instanceof Vector);
  assertEquals([...result], [14, 11]);
  result = vector.slice(-4, -2);
  assert(result instanceof Vector);
  assertEquals([...result], [13, 14]);
  result = vector.slice(-3, -2);
  assert(result instanceof Vector);
  assertEquals([...result], [14]);
  result = vector.slice(-3, -3);
  assert(result instanceof Vector);
  assertEquals([...result], []);
  result = vector.slice(-4, -6);
  assert(result instanceof Vector);
  assertEquals([...result], []);
});

const sortTests: TestSuite<VectorTests> = new TestSuite({
  name: "sort",
  suite: vectorTests,
  beforeEach: vectorBeforeEach,
});

test(sortTests, "no args", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  assertEquals(vector.toArray(), [13, 14, 11, 12]);
  assertEquals(vector.sort(), vector);
  assertEquals(vector.toArray(), [11, 12, 13, 14]);
});

test(sortTests, "with compare functions", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  assertEquals(vector.toArray(), [13, 14, 11, 12]);
  assertEquals(vector.sort(descend), vector);
  assertEquals(vector.toArray(), [14, 13, 12, 11]);
});

const spliceTests: TestSuite<VectorTests> = new TestSuite({
  name: "splice",
  suite: vectorTests,
  beforeEach: vectorBeforeEach,
});

test(spliceTests, "delete from start to end", (context: VectorTests) => {
  let vector: Vector<number> = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  let result: Vector<number> = vector.splice(1);
  assert(result instanceof Vector);
  assertEquals([...result], [14, 11, 12]);
  assertEquals([...vector], [13]);

  vector = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  result = vector.splice(2);
  assert(result instanceof Vector);
  assertEquals([...result], [11, 12]);
  assertEquals([...vector], [13, 14]);
});

test(
  spliceTests,
  "delete from start to start + count",
  (context: VectorTests) => {
    context.vector.push(15, 16);
    let vector: Vector<number> = Vector.from(context.vector);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
    let result: Vector<number> = vector.splice(1, 2);
    assert(result instanceof Vector);
    assertEquals([...result], [14, 11]);
    assertEquals([...vector], [13, 12, 15, 16]);

    vector = Vector.from(context.vector);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
    result = vector.splice(3, 2);
    assert(result instanceof Vector);
    assertEquals([...result], [12, 15]);
    assertEquals([...vector], [13, 14, 11, 16]);
  },
);

test(
  spliceTests,
  "default start to 0 if less than negative length",
  (context: VectorTests) => {
    context.vector.push(15, 16);
    let vector: Vector<number> = Vector.from(context.vector);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
    let result: Vector<number> = vector.splice(-5, 2);
    assert(result instanceof Vector);
    assertEquals([...result], [14, 11]);
    assertEquals([...vector], [13, 12, 15, 16]);

    vector = Vector.from(context.vector);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
    result = vector.splice(-9, 2);
    assert(result instanceof Vector);
    assertEquals([...result], [13, 14]);
    assertEquals([...vector], [11, 12, 15, 16]);
  },
);

test(
  spliceTests,
  "do not delete from start if count is 0 or less",
  (context: VectorTests) => {
    context.vector.push(15, 16);
    let vector: Vector<number> = Vector.from(context.vector);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
    let result: Vector<number> = vector.splice(1, 0);
    assert(result instanceof Vector);
    assertEquals([...result], []);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);

    vector = Vector.from(context.vector);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
    result = vector.splice(3, -1);
    assert(result instanceof Vector);
    assertEquals([...result], []);
    assertEquals([...vector], [13, 14, 11, 12, 15, 16]);
  },
);

test(spliceTests, "insert at start without removal", (context: VectorTests) => {
  let vector: Vector<number> = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  let result: Vector<number> = vector.splice(1, 0, 15, 16);
  assert(result instanceof Vector);
  assertEquals([...result], []);
  assertEquals([...vector], [13, 15, 16, 14, 11, 12]);

  vector = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  result = vector.splice(2, 0, 15, 16);
  assert(result instanceof Vector);
  assertEquals([...result], []);
  assertEquals([...vector], [13, 14, 15, 16, 11, 12]);
});

test(spliceTests, "replace at start", (context: VectorTests) => {
  let vector: Vector<number> = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  let result: Vector<number> = vector.splice(1, 2, 15, 16);
  assert(result instanceof Vector);
  assertEquals([...result], [14, 11]);
  assertEquals([...vector], [13, 15, 16, 12]);

  vector = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  result = vector.splice(2, 2, 15, 16);
  assert(result instanceof Vector);
  assertEquals([...result], [11, 12]);
  assertEquals([...vector], [13, 14, 15, 16]);
});

test(spliceTests, "replace at start with removal", (context: VectorTests) => {
  let vector: Vector<number> = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  let result: Vector<number> = vector.splice(1, 2, 15);
  assert(result instanceof Vector);
  assertEquals([...result], [14, 11]);
  assertEquals([...vector], [13, 15, 12]);

  vector = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  result = vector.splice(2, 2, 15);
  assert(result instanceof Vector);
  assertEquals([...result], [11, 12]);
  assertEquals([...vector], [13, 14, 15]);
});

test(spliceTests, "replace and insert at start", (context: VectorTests) => {
  let vector: Vector<number> = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  let result: Vector<number> = vector.splice(1, 1, 15, 16);
  assert(result instanceof Vector);
  assertEquals([...result], [14]);
  assertEquals([...vector], [13, 15, 16, 11, 12]);

  vector = Vector.from(context.vector);
  assertEquals([...vector], [13, 14, 11, 12]);
  result = vector.splice(2, 1, 15, 16);
  assert(result instanceof Vector);
  assertEquals([...result], [11]);
  assertEquals([...vector], [13, 14, 15, 16, 12]);
});

function indexOfBeforeEach(context: VectorTests) {
  const vector: Vector<number> = new Vector(8);
  vector.push(11, 14, 12);
  vector.unshift(13, 11, 14);
  assertEquals(vector.toArray(), [13, 11, 14, 11, 14, 12]);
  context.vector = vector;
}

const indexOfTests: TestSuite<VectorTests> = new TestSuite({
  name: "indexOf/lastIndexOf",
  suite: vectorTests,
  beforeEach: indexOfBeforeEach,
});

test(indexOfTests, "search whole vector", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  assertEquals(vector.indexOf(13), 0);
  assertEquals(vector.lastIndexOf(13), 0);
  assertEquals(vector.indexOf(11), 1);
  assertEquals(vector.lastIndexOf(11), 3);
  assertEquals(vector.indexOf(14), 2);
  assertEquals(vector.lastIndexOf(14), 4);
  assertEquals(vector.indexOf(12), 5);
  assertEquals(vector.lastIndexOf(12), 5);
  assertEquals(vector.indexOf(15), -1);
  assertEquals(vector.lastIndexOf(15), -1);
});

test(
  indexOfTests,
  "search vector with positive range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    assertEquals(vector.indexOf(13, 1), -1);
    assertEquals(vector.lastIndexOf(13, 0, 2), 0);
    assertEquals(vector.indexOf(11, 2), 3);
    assertEquals(vector.lastIndexOf(11, 0, 3), 1);
    assertEquals(vector.indexOf(14, 2), 2);
    assertEquals(vector.lastIndexOf(14, 0, 3), 2);
    assertEquals(vector.indexOf(12, 4), 5);
    assertEquals(vector.lastIndexOf(12, 0, 5), -1);
    assertEquals(vector.indexOf(15, 3), -1);
    assertEquals(vector.lastIndexOf(15, 0, 4), -1);
  },
);

test(
  indexOfTests,
  "search vector with negative range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    assertEquals(vector.indexOf(13, -5), -1);
    assertEquals(vector.lastIndexOf(13, 0, -4), 0);
    assertEquals(vector.indexOf(11, -4), 3);
    assertEquals(vector.lastIndexOf(11, 0, -3), 1);
    assertEquals(vector.indexOf(14, -4), 2);
    assertEquals(vector.lastIndexOf(14, 0, -3), 2);
    assertEquals(vector.indexOf(12, -2), 5);
    assertEquals(vector.lastIndexOf(12, 0, -1), -1);
    assertEquals(vector.indexOf(15, -3), -1);
    assertEquals(vector.lastIndexOf(15, 0, -2), -1);
  },
);

const includesTests: TestSuite<VectorTests> = new TestSuite({
  name: "includes",
  suite: vectorTests,
  beforeEach: indexOfBeforeEach,
});

test(includesTests, "search whole vector", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  assertEquals(vector.includes(13), true);
  assertEquals(vector.includes(11), true);
  assertEquals(vector.includes(14), true);
  assertEquals(vector.includes(12), true);
  assertEquals(vector.includes(15), false);
});

test(
  includesTests,
  "search vector with positive range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    assertEquals(vector.includes(13, 1), false);
    assertEquals(vector.includes(13, 0, 2), true);
    assertEquals(vector.includes(11, 2), true);
    assertEquals(vector.includes(11, 0, 3), true);
    assertEquals(vector.includes(14, 2), true);
    assertEquals(vector.includes(14, 0, 3), true);
    assertEquals(vector.includes(12, 4), true);
    assertEquals(vector.includes(12, 0, 5), false);
    assertEquals(vector.includes(15, 3), false);
    assertEquals(vector.includes(15, 0, 4), false);
  },
);

test(
  includesTests,
  "search vector with negative range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    assertEquals(vector.includes(13, -5), false);
    assertEquals(vector.includes(13, 0, -4), true);
    assertEquals(vector.includes(11, -4), true);
    assertEquals(vector.includes(11, 0, -3), true);
    assertEquals(vector.includes(14, -4), true);
    assertEquals(vector.includes(14, 0, -3), true);
    assertEquals(vector.includes(12, -2), true);
    assertEquals(vector.includes(12, 0, -1), false);
    assertEquals(vector.includes(15, -3), false);
    assertEquals(vector.includes(15, 0, -2), false);
  },
);

interface FindTests {
  vector: Vector<Thing>;
}

function findBeforeEach(context: FindTests) {
  const vector: Vector<Thing> = new Vector(8);
  vector.push(
    { id: 11, value: 21 },
    { id: 14, value: 22 },
    { id: 12, value: 23 },
  );
  vector.unshift(
    { id: 13, value: 24 },
    { id: 11, value: 25 },
    { id: 14, value: 26 },
  );
  assertEquals(vector.toArray(), [
    { id: 13, value: 24 },
    { id: 11, value: 25 },
    { id: 14, value: 26 },
    { id: 11, value: 21 },
    { id: 14, value: 22 },
    { id: 12, value: 23 },
  ]);
  context.vector = vector;
}

interface FindCallback {
  end(): number;
  callback(
    value: Thing | undefined,
    index: number,
    vector: Vector<Thing>,
  ): boolean;
}

function findCallbackFactory(
  // deno-lint-ignore no-explicit-any
  thisArg: any,
  searchVector: Vector<Thing>,
  searchId: number,
  fromIndex: number,
  step: number,
): FindCallback {
  let expectedIndex: number = fromIndex;
  return {
    end: () => expectedIndex - step,
    callback(
      // deno-lint-ignore no-explicit-any
      this: any,
      value: Thing | undefined,
      index: number,
      vector: Vector<Thing>,
    ): boolean {
      assertStrictEquals(this, thisArg);
      assertStrictEquals(vector, searchVector);
      assertEquals(index, expectedIndex);
      expectedIndex += step;
      assertEquals(value, vector.get(index));
      return value?.id === searchId;
    },
  };
}

const findIndexTests: TestSuite<FindTests> = new TestSuite({
  name: "findIndex/findLastIndex",
  suite: vectorTests,
  beforeEach: findBeforeEach,
});

test(findIndexTests, "search whole vector", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg = undefined;
  let { end, callback }: FindCallback = findCallbackFactory(
    thisArg,
    vector,
    13,
    0,
    1,
  );
  assertEquals(vector.findIndex(callback), 0);
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 5, -1));
  assertEquals(vector.findLastIndex(callback), 0);
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
  assertEquals(vector.findIndex(callback), 1);
  assertEquals(end(), 1);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 5, -1));
  assertEquals(vector.findLastIndex(callback), 3);
  assertEquals(end(), 3);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
  assertEquals(vector.findIndex(callback), 2);
  assertEquals(end(), 2);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 5, -1));
  assertEquals(vector.findLastIndex(callback), 4);
  assertEquals(end(), 4);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
  assertEquals(vector.findIndex(callback), 5);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 5, -1));
  assertEquals(vector.findLastIndex(callback), 5);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
  assertEquals(vector.findIndex(callback), -1);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 5, -1));
  assertEquals(vector.findLastIndex(callback), -1);
  assertEquals(end(), 0);
});

test(
  findIndexTests,
  "search whole vector with thisArg",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      0,
      1,
    );
    assertEquals(vector.findIndex(callback, thisArg), 0);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 5, -1));
    assertEquals(vector.findLastIndex(callback, thisArg), 0);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
    assertEquals(vector.findIndex(callback, thisArg), 1);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 5, -1));
    assertEquals(vector.findLastIndex(callback, thisArg), 3);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
    assertEquals(vector.findIndex(callback, thisArg), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 5, -1));
    assertEquals(vector.findLastIndex(callback, thisArg), 4);
    assertEquals(end(), 4);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
    assertEquals(vector.findIndex(callback, thisArg), 5);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 5, -1));
    assertEquals(vector.findLastIndex(callback, thisArg), 5);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
    assertEquals(vector.findIndex(callback, thisArg), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 5, -1));
    assertEquals(vector.findLastIndex(callback, thisArg), -1);
    assertEquals(end(), 0);
  },
);

test(
  findIndexTests,
  "search vector with positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.findIndex(callback, 1), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(vector.findLastIndex(callback, 0, 2), 0);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.findIndex(callback, 2), 3);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(vector.findLastIndex(callback, 0, 3), 1);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.findIndex(callback, 2), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(vector.findLastIndex(callback, 0, 3), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.findIndex(callback, 4), 5);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLastIndex(callback, 0, 5), -1);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.findIndex(callback, 3), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLastIndex(callback, 0, 4), -1);
    assertEquals(end(), 0);
  },
);

test(
  findIndexTests,
  "search vector with thisArg and positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.findIndex(callback, thisArg, 1), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, 2), 0);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.findIndex(callback, thisArg, 2), 3);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, 3), 1);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.findIndex(callback, thisArg, 2), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, 3), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.findIndex(callback, thisArg, 4), 5);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, 5), -1);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.findIndex(callback, thisArg, 3), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, 4), -1);
    assertEquals(end(), 0);
  },
);

test(
  findIndexTests,
  "search vector with negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.findIndex(callback, -5), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(vector.findLastIndex(callback, 0, -4), 0);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.findIndex(callback, -4), 3);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(vector.findLastIndex(callback, 0, -3), 1);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.findIndex(callback, -4), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(vector.findLastIndex(callback, 0, -3), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.findIndex(callback, -2), 5);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLastIndex(callback, 0, -1), -1);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.findIndex(callback, -3), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLastIndex(callback, 0, -2), -1);
    assertEquals(end(), 0);
  },
);

test(
  findIndexTests,
  "search vector with thisArg and negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.findIndex(callback, thisArg, -5), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, -4), 0);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.findIndex(callback, thisArg, -4), 3);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, -3), 1);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.findIndex(callback, thisArg, -4), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, -3), 2);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.findIndex(callback, thisArg, -2), 5);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, -1), -1);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.findIndex(callback, thisArg, -3), -1);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLastIndex(callback, thisArg, 0, -2), -1);
    assertEquals(end(), 0);
  },
);

const findTests: TestSuite<FindTests> = new TestSuite({
  name: "find/findLast",
  suite: vectorTests,
  beforeEach: findBeforeEach,
});

test(findTests, "search whole vector", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg = undefined;
  let { end, callback }: FindCallback = findCallbackFactory(
    thisArg,
    vector,
    13,
    0,
    1,
  );
  assertEquals(vector.find(callback), { id: 13, value: 24 });
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 5, -1));
  assertEquals(vector.findLast(callback), { id: 13, value: 24 });
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
  assertEquals(vector.find(callback), { id: 11, value: 25 });
  assertEquals(end(), 1);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 5, -1));
  assertEquals(vector.findLast(callback), { id: 11, value: 21 });
  assertEquals(end(), 3);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
  assertEquals(vector.find(callback), { id: 14, value: 26 });
  assertEquals(end(), 2);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 5, -1));
  assertEquals(vector.findLast(callback), { id: 14, value: 22 });
  assertEquals(end(), 4);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
  assertEquals(vector.find(callback), { id: 12, value: 23 });
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 5, -1));
  assertEquals(vector.findLast(callback), { id: 12, value: 23 });
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
  assertEquals(vector.find(callback), undefined);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 5, -1));
  assertEquals(vector.findLast(callback), undefined);
  assertEquals(end(), 0);
});

test(findTests, "search whole vector with thisArg", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg: Thing = { id: 1, value: 2 };
  let { end, callback }: FindCallback = findCallbackFactory(
    thisArg,
    vector,
    13,
    0,
    1,
  );
  assertEquals(vector.find(callback, thisArg), { id: 13, value: 24 });
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 5, -1));
  assertEquals(vector.findLast(callback, thisArg), { id: 13, value: 24 });
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
  assertEquals(vector.find(callback, thisArg), { id: 11, value: 25 });
  assertEquals(end(), 1);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 5, -1));
  assertEquals(vector.findLast(callback, thisArg), { id: 11, value: 21 });
  assertEquals(end(), 3);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
  assertEquals(vector.find(callback, thisArg), { id: 14, value: 26 });
  assertEquals(end(), 2);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 5, -1));
  assertEquals(vector.findLast(callback, thisArg), { id: 14, value: 22 });
  assertEquals(end(), 4);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
  assertEquals(vector.find(callback, thisArg), { id: 12, value: 23 });
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 5, -1));
  assertEquals(vector.findLast(callback, thisArg), { id: 12, value: 23 });
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
  assertEquals(vector.find(callback, thisArg), undefined);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 5, -1));
  assertEquals(vector.findLast(callback, thisArg), undefined);
  assertEquals(end(), 0);
});

test(
  findTests,
  "search vector with positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.find(callback, 1), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(vector.findLast(callback, 0, 2), { id: 13, value: 24 });
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.find(callback, 2), { id: 11, value: 21 });
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(vector.findLast(callback, 0, 3), { id: 11, value: 25 });
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.find(callback, 2), { id: 14, value: 26 });
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(vector.findLast(callback, 0, 3), { id: 14, value: 26 });
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.find(callback, 4), { id: 12, value: 23 });
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLast(callback, 0, 5), undefined);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.find(callback, 3), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLast(callback, 0, 4), undefined);
    assertEquals(end(), 0);
  },
);

test(
  findTests,
  "search vector with thisArg and positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.find(callback, thisArg, 1), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(
      vector.findLast(callback, thisArg, 0, 2),
      { id: 13, value: 24 },
    );
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.find(callback, thisArg, 2), { id: 11, value: 21 });
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(
      vector.findLast(callback, thisArg, 0, 3),
      { id: 11, value: 25 },
    );
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.find(callback, thisArg, 2), { id: 14, value: 26 });
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(
      vector.findLast(callback, thisArg, 0, 3),
      { id: 14, value: 26 },
    );
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.find(callback, thisArg, 4), { id: 12, value: 23 });
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLast(callback, thisArg, 0, 5), undefined);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.find(callback, thisArg, 3), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLast(callback, thisArg, 0, 4), undefined);
    assertEquals(end(), 0);
  },
);

test(
  findTests,
  "search vector with negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.find(callback, -5), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(vector.findLast(callback, 0, -4), { id: 13, value: 24 });
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.find(callback, -4), { id: 11, value: 21 });
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(vector.findLast(callback, 0, -3), { id: 11, value: 25 });
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.find(callback, -4), { id: 14, value: 26 });
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(vector.findLast(callback, 0, -3), { id: 14, value: 26 });
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.find(callback, -2), { id: 12, value: 23 });
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLast(callback, 0, -1), undefined);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.find(callback, -3), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLast(callback, 0, -2), undefined);
    assertEquals(end(), 0);
  },
);

test(
  findTests,
  "search vector with thisArg and negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.find(callback, thisArg, -5), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 1, -1));
    assertEquals(
      vector.findLast(callback, thisArg, 0, -4),
      { id: 13, value: 24 },
    );
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.find(callback, thisArg, -4), { id: 11, value: 21 });
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, -1));
    assertEquals(
      vector.findLast(callback, thisArg, 0, -3),
      { id: 11, value: 25 },
    );
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.find(callback, thisArg, -4), { id: 14, value: 26 });
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, -1));
    assertEquals(
      vector.findLast(callback, thisArg, 0, -3),
      { id: 14, value: 26 },
    );
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.find(callback, thisArg, -2), { id: 12, value: 23 });
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, -1));
    assertEquals(vector.findLast(callback, thisArg, 0, -1), undefined);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.find(callback, thisArg, -3), undefined);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, -1));
    assertEquals(vector.findLast(callback, thisArg, 0, -2), undefined);
    assertEquals(end(), 0);
  },
);

const someTests: TestSuite<FindTests> = new TestSuite({
  name: "some",
  suite: vectorTests,
  beforeEach: findBeforeEach,
});

test(someTests, "search whole vector", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg = undefined;
  let { end, callback }: FindCallback = findCallbackFactory(
    thisArg,
    vector,
    13,
    0,
    1,
  );
  assertEquals(vector.some(callback), true);
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
  assertEquals(vector.some(callback), true);
  assertEquals(end(), 1);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
  assertEquals(vector.some(callback), true);
  assertEquals(end(), 2);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
  assertEquals(vector.some(callback), true);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
  assertEquals(vector.some(callback), false);
  assertEquals(end(), 5);
});

test(someTests, "search whole vector with thisArg", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg: Thing = { id: 1, value: 2 };
  let { end, callback }: FindCallback = findCallbackFactory(
    thisArg,
    vector,
    13,
    0,
    1,
  );
  assertEquals(vector.some(callback, thisArg), true);
  assertEquals(end(), 0);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
  assertEquals(vector.some(callback, thisArg), true);
  assertEquals(end(), 1);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
  assertEquals(vector.some(callback, thisArg), true);
  assertEquals(end(), 2);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
  assertEquals(vector.some(callback, thisArg), true);
  assertEquals(end(), 5);
  ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
  assertEquals(vector.some(callback, thisArg), false);
  assertEquals(end(), 5);
});

test(
  someTests,
  "search vector with positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.some(callback, 1), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 0, 1));
    assertEquals(vector.some(callback, 0, 2), true);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.some(callback, 2), true);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
    assertEquals(vector.some(callback, 0, 3), true);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.some(callback, 2), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
    assertEquals(vector.some(callback, 0, 3), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.some(callback, 4), true);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
    assertEquals(vector.some(callback, 0, 5), false);
    assertEquals(end(), 4);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.some(callback, 3), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
    assertEquals(vector.some(callback, 0, 4), false);
    assertEquals(end(), 3);
  },
);

test(
  someTests,
  "search vector with thisArg and positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.some(callback, thisArg, 1), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, 2), true);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.some(callback, thisArg, 2), true);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, 3), true);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.some(callback, thisArg, 2), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, 3), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.some(callback, thisArg, 4), true);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, 5), false);
    assertEquals(end(), 4);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.some(callback, thisArg, 3), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, 4), false);
    assertEquals(end(), 3);
  },
);

test(
  someTests,
  "search vector with negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.some(callback, -5), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 0, 1));
    assertEquals(vector.some(callback, 0, -4), true);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.some(callback, -4), true);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
    assertEquals(vector.some(callback, 0, -3), true);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.some(callback, -4), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
    assertEquals(vector.some(callback, 0, -3), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.some(callback, -2), true);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
    assertEquals(vector.some(callback, 0, -1), false);
    assertEquals(end(), 4);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.some(callback, -3), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
    assertEquals(vector.some(callback, 0, -2), false);
    assertEquals(end(), 3);
  },
);

test(
  someTests,
  "search vector with thisArg and negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: FindCallback = findCallbackFactory(
      thisArg,
      vector,
      13,
      1,
      1,
    );
    assertEquals(vector.some(callback, thisArg, -5), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 13, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, -4), true);
    assertEquals(end(), 0);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 2, 1));
    assertEquals(vector.some(callback, thisArg, -4), true);
    assertEquals(end(), 3);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 11, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, -3), true);
    assertEquals(end(), 1);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 2, 1));
    assertEquals(vector.some(callback, thisArg, -4), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 14, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, -3), true);
    assertEquals(end(), 2);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 4, 1));
    assertEquals(vector.some(callback, thisArg, -2), true);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 12, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, -1), false);
    assertEquals(end(), 4);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 3, 1));
    assertEquals(vector.some(callback, thisArg, -3), false);
    assertEquals(end(), 5);
    ({ end, callback } = findCallbackFactory(thisArg, vector, 15, 0, 1));
    assertEquals(vector.some(callback, thisArg, 0, -2), false);
    assertEquals(end(), 3);
  },
);

interface EveryCallback {
  end(): number;
  callback(value: Thing, index: number, vector: Vector<Thing>): void;
}

function everyCallbackFactory(
  // deno-lint-ignore no-explicit-any
  thisArg: any,
  searchVector: Vector<Thing>,
  greaterThanEq: number,
  lessThanEq: number,
  fromIndex: number,
): EveryCallback {
  let expectedIndex = fromIndex;
  return {
    end: () => expectedIndex - 1,
    callback(
      // deno-lint-ignore no-explicit-any
      this: any,
      value: Thing,
      index: number,
      vector: Vector<Thing>,
    ) {
      assertStrictEquals(this, thisArg);
      assertStrictEquals(vector, searchVector);
      assertEquals(index, expectedIndex++);
      assertEquals(value, vector.get(index));
      return value.value >= greaterThanEq && value.value <= lessThanEq;
    },
  };
}

const everyTests: TestSuite<FindTests> = new TestSuite({
  name: "every",
  suite: vectorTests,
  beforeEach: findBeforeEach,
});

test(everyTests, "check whole vector", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg = undefined;
  let { end, callback }: EveryCallback = everyCallbackFactory(
    thisArg,
    vector,
    21,
    26,
    0,
  );
  assertEquals(vector.every(callback), true);
  assertEquals(end(), 5);
  ({ end, callback } = everyCallbackFactory(thisArg, vector, 22, 26, 0));
  assertEquals(vector.every(callback), false);
  assertEquals(end(), 3);
  ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 25, 0));
  assertEquals(vector.every(callback), false);
  assertEquals(end(), 2);
});

test(everyTests, "check whole vector with thisArg", (context: FindTests) => {
  const vector: Vector<Thing> = context.vector;
  const thisArg: Thing = { id: 1, value: 2 };
  let { end, callback }: EveryCallback = everyCallbackFactory(
    thisArg,
    vector,
    21,
    26,
    0,
  );
  assertEquals(vector.every(callback, thisArg), true);
  assertEquals(end(), 5);
  ({ end, callback } = everyCallbackFactory(thisArg, vector, 22, 26, 0));
  assertEquals(vector.every(callback, thisArg), false);
  assertEquals(end(), 3);
  ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 25, 0));
  assertEquals(vector.every(callback, thisArg), false);
  assertEquals(end(), 2);
});

test(
  everyTests,
  "check vector with positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: EveryCallback = everyCallbackFactory(
      thisArg,
      vector,
      24,
      26,
      0,
    );
    assertEquals(vector.every(callback, 0, 3), true);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 25, 0));
    assertEquals(vector.every(callback, 0, 3), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 26, 2));
    assertEquals(vector.every(callback, 2, 5), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 2));
    assertEquals(vector.every(callback, 2, 5), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, 3, 5), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, 3, 6), false);
    assertEquals(end(), 5);
  },
);

test(
  everyTests,
  "check vector with thisArg and positive range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: EveryCallback = everyCallbackFactory(
      thisArg,
      vector,
      24,
      26,
      0,
    );
    assertEquals(vector.every(callback, thisArg, 0, 3), true);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 25, 0));
    assertEquals(vector.every(callback, thisArg, 0, 3), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 26, 2));
    assertEquals(vector.every(callback, thisArg, 2, 5), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 2));
    assertEquals(vector.every(callback, thisArg, 2, 5), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, thisArg, 3, 5), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, thisArg, 3, 6), false);
    assertEquals(end(), 5);
  },
);

test(
  everyTests,
  "check vector with negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg = undefined;
    let { end, callback }: EveryCallback = everyCallbackFactory(
      thisArg,
      vector,
      24,
      26,
      0,
    );
    assertEquals(vector.every(callback, 0, -3), true);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 25, 0));
    assertEquals(vector.every(callback, 0, -3), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 26, 2));
    assertEquals(vector.every(callback, -4, -1), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 2));
    assertEquals(vector.every(callback, -4, -1), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, -3, -1), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, -3), false);
    assertEquals(end(), 5);
  },
);

test(
  everyTests,
  "check vector with thisArg and negative range",
  (context: FindTests) => {
    const vector: Vector<Thing> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: EveryCallback = everyCallbackFactory(
      thisArg,
      vector,
      24,
      26,
      0,
    );
    assertEquals(vector.every(callback, thisArg, 0, -3), true);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 25, 0));
    assertEquals(vector.every(callback, thisArg, 0, -3), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 26, 2));
    assertEquals(vector.every(callback, thisArg, -4, -1), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 2));
    assertEquals(vector.every(callback, thisArg, -4, -1), false);
    assertEquals(end(), 2);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, thisArg, -3, -1), true);
    assertEquals(end(), 4);
    ({ end, callback } = everyCallbackFactory(thisArg, vector, 21, 22, 3));
    assertEquals(vector.every(callback, thisArg, -3), false);
    assertEquals(end(), 5);
  },
);

interface ForEachCallback {
  end(): number;
  callback(
    value: number | undefined,
    index: number,
    vector: Vector<number>,
  ): void;
}

function forEachCallbackFactory(
  // deno-lint-ignore no-explicit-any
  thisArg: any,
  iterateVector: Vector<number>,
  fromIndex: number,
): ForEachCallback {
  let expectedIndex = fromIndex;
  return {
    end: () => expectedIndex - 1,
    callback(
      // deno-lint-ignore no-explicit-any
      this: any,
      value: number,
      index: number,
      vector: Vector<number>,
    ): void {
      assertStrictEquals(this, thisArg);
      assertStrictEquals(vector, iterateVector);
      assertEquals(index, expectedIndex++);
      assertEquals(value, vector.get(index));
    },
  };
}

const forEachTests: TestSuite<VectorTests> = new TestSuite({
  name: "forEach",
  suite: vectorTests,
  beforeEach: vectorBeforeEach,
});

test(forEachTests, "iterate whole vector", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  const thisArg = undefined;
  const { end, callback }: ForEachCallback = forEachCallbackFactory(
    thisArg,
    vector,
    0,
  );
  assertEquals(vector.forEach(callback), undefined);
  assertEquals(end(), 3);
});

test(
  forEachTests,
  "iterate whole vector with thisArg",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    const { end, callback } = forEachCallbackFactory(thisArg, vector, 0);
    assertEquals(vector.forEach(callback, thisArg), undefined);
    assertEquals(end(), 3);
  },
);

test(
  forEachTests,
  "iterate vector with positive range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg = undefined;
    let { end, callback }: ForEachCallback = forEachCallbackFactory(
      thisArg,
      vector,
      1,
    );
    assertEquals(vector.forEach(callback, 1), undefined);
    assertEquals(end(), 3);
    ({ end, callback } = forEachCallbackFactory(thisArg, vector, 1));
    assertEquals(vector.forEach(callback, 1, 3), undefined);
    assertEquals(end(), 2);
  },
);

test(
  forEachTests,
  "iterate vector with thisArg and positive range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: ForEachCallback = forEachCallbackFactory(
      thisArg,
      vector,
      1,
    );
    assertEquals(vector.forEach(callback, thisArg, 1), undefined);
    assertEquals(end(), 3);
    ({ end, callback } = forEachCallbackFactory(thisArg, vector, 1));
    assertEquals(vector.forEach(callback, thisArg, 1, 3), undefined);
    assertEquals(end(), 2);
  },
);

test(
  forEachTests,
  "iterate vector with negative range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg = undefined;
    let { end, callback }: ForEachCallback = forEachCallbackFactory(
      thisArg,
      vector,
      1,
    );
    assertEquals(vector.forEach(callback, -3), undefined);
    assertEquals(end(), 3);
    ({ end, callback } = forEachCallbackFactory(thisArg, vector, 1));
    assertEquals(vector.forEach(callback, -3, 3), undefined);
    assertEquals(end(), 2);
    ({ end, callback } = forEachCallbackFactory(thisArg, vector, 1));
    assertEquals(vector.forEach(callback, -3, -1), undefined);
    assertEquals(end(), 2);
  },
);

test(
  forEachTests,
  "iterate vector with thisArg and negative range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: ForEachCallback = forEachCallbackFactory(
      thisArg,
      vector,
      1,
    );
    assertEquals(vector.forEach(callback, thisArg, -3), undefined);
    assertEquals(end(), 3);
    ({ end, callback } = forEachCallbackFactory(thisArg, vector, 1));
    assertEquals(vector.forEach(callback, thisArg, -3, 3), undefined);
    assertEquals(end(), 2);
    ({ end, callback } = forEachCallbackFactory(thisArg, vector, 1));
    assertEquals(vector.forEach(callback, thisArg, -3, -1), undefined);
    assertEquals(end(), 2);
  },
);

interface MapCallback {
  end(): number;
  callback(
    value: number | undefined,
    index: number,
    vector: Vector<number>,
  ): number;
}

function mapCallbackFactory(
  // deno-lint-ignore no-explicit-any
  thisArg: any,
  iterateVector: Vector<number>,
  fromIndex: number,
): MapCallback {
  let expectedIndex = fromIndex;
  return {
    end: () => expectedIndex - 1,
    callback(
      // deno-lint-ignore no-explicit-any
      this: any,
      value: number,
      index: number,
      vector: Vector<number>,
    ): number {
      assertStrictEquals(this, thisArg);
      assertStrictEquals(vector, iterateVector);
      assertEquals(index, expectedIndex++);
      assertEquals(value, vector.get(index));
      return 2 * value;
    },
  };
}

const mapTests: TestSuite<VectorTests> = new TestSuite({
  name: "map",
  suite: vectorTests,
  beforeEach: vectorBeforeEach,
});

test(mapTests, "iterate whole vector", (context: VectorTests) => {
  const vector: Vector<number> = context.vector;
  const thisArg = undefined;
  const { end, callback }: MapCallback = mapCallbackFactory(
    thisArg,
    vector,
    0,
  );
  const result: Vector<number> = vector.map(callback);
  assert(result instanceof Vector);
  assertEquals(result.toArray(), [26, 28, 22, 24]);
  assertEquals(end(), 3);
});

test(
  mapTests,
  "iterate whole vector with thisArg",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    const { end, callback } = mapCallbackFactory(thisArg, vector, 0);
    const result: Vector<number> = vector.map(callback, thisArg);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [26, 28, 22, 24]);
    assertEquals(end(), 3);
  },
);

test(
  mapTests,
  "iterate vector with positive range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg = undefined;
    let { end, callback }: MapCallback = mapCallbackFactory(
      thisArg,
      vector,
      1,
    );
    let result: Vector<number> = vector.map(callback, 1);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22, 24]);
    assertEquals(end(), 3);
    ({ end, callback } = mapCallbackFactory(thisArg, vector, 1));
    result = vector.map(callback, 1, 3);
    assertEquals(result.toArray(), [28, 22]);
    assertEquals(end(), 2);
  },
);

test(
  mapTests,
  "iterate vector with thisArg and positive range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: MapCallback = mapCallbackFactory(
      thisArg,
      vector,
      1,
    );
    let result: Vector<number> = vector.map(callback, thisArg, 1);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22, 24]);
    assertEquals(end(), 3);
    ({ end, callback } = mapCallbackFactory(thisArg, vector, 1));
    result = vector.map(callback, thisArg, 1, 3);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22]);
    assertEquals(end(), 2);
  },
);

test(
  mapTests,
  "iterate vector with negative range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg = undefined;
    let { end, callback }: MapCallback = mapCallbackFactory(
      thisArg,
      vector,
      1,
    );
    let result: Vector<number> = vector.map(callback, -3);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22, 24]);
    assertEquals(end(), 3);
    ({ end, callback } = mapCallbackFactory(thisArg, vector, 1));
    result = vector.map(callback, -3, 3);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22]);
    assertEquals(end(), 2);
    ({ end, callback } = mapCallbackFactory(thisArg, vector, 1));
    result = vector.map(callback, -3, -1);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22]);
    assertEquals(end(), 2);
  },
);

test(
  mapTests,
  "iterate vector with thisArg and negative range",
  (context: VectorTests) => {
    const vector: Vector<number> = context.vector;
    const thisArg: Thing = { id: 1, value: 2 };
    let { end, callback }: MapCallback = mapCallbackFactory(
      thisArg,
      vector,
      1,
    );
    let result: Vector<number> = vector.map(callback, thisArg, -3);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22, 24]);
    assertEquals(end(), 3);
    ({ end, callback } = mapCallbackFactory(thisArg, vector, 1));
    result = vector.map(callback, thisArg, -3, 3);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22]);
    assertEquals(end(), 2);
    ({ end, callback } = mapCallbackFactory(thisArg, vector, 1));
    result = vector.map(callback, thisArg, -3, -1);
    assert(result instanceof Vector);
    assertEquals(result.toArray(), [28, 22]);
    assertEquals(end(), 2);
  },
);

interface ConcatTests {
  vectors: Vector<number>[];
  array: number[];
}
const concatTests: TestSuite<ConcatTests> = new TestSuite({
  name: "concat",
  suite: vectorTests,
  beforeEach(context: ConcatTests) {
    const vectors: Vector<number>[] = [];
    vectors.push(Vector.from([1, 3, 5]));
    vectors.push(Vector.from([2, 4]));
    vectors.push(new Vector(3));
    vectors[2].push(6);
    vectors[2].unshift(7);
    vectors[2].push(8);
    context.vectors = vectors;
    context.array = [0, 9, -1];
  },
});

test(concatTests, "vector", (context: ConcatTests) => {
  const vectors: Vector<number>[] = context.vectors;
  const result: Vector<number> = vectors[0].concat(vectors[1]);
  assertEquals([...vectors[0]], [1, 3, 5]);
  assertEquals([...vectors[1]], [2, 4]);
  assert(result instanceof Vector);
  assertEquals([...result], [1, 3, 5, 2, 4]);
});

test(concatTests, "multiple vectors", (context: ConcatTests) => {
  const vectors: Vector<number>[] = context.vectors;
  const result: Vector<number> = vectors[0].concat(vectors[1], vectors[2]);
  assertEquals([...vectors[0]], [1, 3, 5]);
  assertEquals([...vectors[1]], [2, 4]);
  assertEquals([...vectors[2]], [7, 6, 8]);
  assert(result instanceof Vector);
  assertEquals([...result], [1, 3, 5, 2, 4, 7, 6, 8]);
});

test(concatTests, "array", (context: ConcatTests) => {
  const vectors: Vector<number>[] = context.vectors;
  const array: number[] = context.array;
  const result: Vector<number> = vectors[0].concat(array);
  assert(result instanceof Vector);
  assertEquals([...result], [1, 3, 5, 0, 9, -1]);
});

test(concatTests, "mixed iterables", (context: ConcatTests) => {
  const vectors: Vector<number>[] = context.vectors;
  const array: number[] = context.array;
  const result: Vector<number> = vectors[0].concat(
    vectors[1],
    array,
    vectors[2],
  );
  assert(result instanceof Vector);
  assertEquals([...result], [1, 3, 5, 2, 4, 0, 9, -1, 7, 6, 8]);
});

test(vectorTests, "toArray", () => {
  const vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals(vector.toArray(), [13, 14, 11, 12]);
  assertEquals(Vector.from([1, 3, 5]).toArray(), [1, 3, 5]);
});

const fromTests: TestSuite<void> = new TestSuite({
  name: "from",
  suite: vectorTests,
});

test(fromTests, "empty Array", () => {
  const vector: Vector<number> = Vector.from([]);
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 0);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, 11]);
  assertEquals(vector.length, 2);
  assert(vector.capacity >= 2);
});

test(fromTests, "Array", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1]);
  assertEquals([...vector], [-1, 0, 2, -2, 1]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, -1, 0, 2, -2, 1, 11]);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
});

test(fromTests, "Array with map", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1], {
    map: (value: number | undefined) => 2 * (value ?? 0),
  });
  assertEquals([...vector], [-2, 0, 4, -4, 2]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, -2, 0, 4, -4, 2, 11]);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
});

test(fromTests, "Array with map and thisArg", () => {
  const math = new MyMath();
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1], {
    map: function (this: MyMath, v: number | undefined) {
      return this.multiply(3, v ?? 0);
    },
    thisArg: math,
  });
  assertEquals([...vector], [-3, 0, 6, -6, 3]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, -3, 0, 6, -6, 3, 11]);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
});

test(fromTests, "empty Iterable", () => {
  const vector: Vector<number> = Vector.from([].values());
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 0);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, 11]);
  assertEquals(vector.length, 2);
  assert(vector.capacity >= 2);
});

test(fromTests, "Iterable", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1].values());
  assertEquals([...vector], [-1, 0, 2, -2, 1]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, -1, 0, 2, -2, 1, 11]);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
});

test(fromTests, "Iterable with map", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1].values(), {
    map: (value: number | undefined): number | undefined => {
      return value && (2 * value);
    },
  });
  assertEquals([...vector], [-2, 0, 4, -4, 2]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, -2, 0, 4, -4, 2, 11]);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
});

test(fromTests, "Iterable with map and thisArg", () => {
  const math = new MyMath();
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1].values(), {
    map: function (
      this: MyMath,
      v: number | undefined,
    ): number | undefined {
      return v && this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals([...vector], [-3, 0, 6, -6, 3]);
  assertEquals(vector.length, 5);
  assertEquals(vector.capacity, 5);
  vector.push(11);
  vector.unshift(12);
  assertEquals([...vector], [12, -3, 0, 6, -6, 3, 11]);
  assertEquals(vector.length, 7);
  assert(vector.capacity >= 7);
});

test(fromTests, "empty Vector", () => {
  const vectors: Vector<number>[] = [new Vector(5)];
  vectors.push(Vector.from(vectors[0]));
  assertEquals([...vectors[1]], []);
  assertEquals(vectors[1].length, 0);
  assertEquals(vectors[1].capacity, 5);
});

test(fromTests, "Vector", () => {
  const vectors: Vector<number>[] = [Vector.from([-1, 0, 2, -2, 1])];
  vectors[0].capacity = 10;
  vectors.push(Vector.from(vectors[0]));
  assertEquals([...vectors[1]], [-1, 0, 2, -2, 1]);
  assertEquals(vectors[1].length, 5);
  assertEquals(vectors[1].capacity, 10);
  vectors[1].push(-3);
  vectors[1].unshift(3);
  assertEquals([...vectors[1]], [3, -1, 0, 2, -2, 1, -3]);
  assertEquals(vectors[1].length, 7);
  assertEquals(vectors[1].capacity, 10);
});

test(fromTests, "Vector with map", () => {
  const vectors: Vector<number>[] = [Vector.from([-1, 0, 2, -2, 1])];
  vectors[0].capacity = 10;
  vectors.push(Vector.from(vectors[0], {
    map: (value: number | undefined): number | undefined => value && 2 * value,
  }));
  assertEquals([...vectors[1]], [-2, 0, 4, -4, 2]);
  assertEquals(vectors[1].length, 5);
  assertEquals(vectors[1].capacity, 10);
  vectors[1].push(-3);
  vectors[1].unshift(3);
  assertEquals([...vectors[1]], [3, -2, 0, 4, -4, 2, -3]);
  assertEquals(vectors[1].length, 7);
  assertEquals(vectors[1].capacity, 10);
});

test(fromTests, "Vector with map and thisArg", () => {
  const vectors: Vector<number>[] = [Vector.from([-1, 0, 2, -2, 1])];
  vectors[0].capacity = 10;
  const math = new MyMath();
  vectors.push(Vector.from(vectors[0], {
    map: function (
      this: MyMath,
      v: number | undefined,
    ): number | undefined {
      return v && this.multiply(3, v);
    },
    thisArg: math,
  }));
  assertEquals([...vectors[1]], [-3, 0, 6, -6, 3]);
  assertEquals(vectors[1].length, 5);
  assertEquals(vectors[1].capacity, 10);
  vectors[1].push(-3);
  vectors[1].unshift(3);
  assertEquals([...vectors[1]], [3, -3, 0, 6, -6, 3, -3]);
  assertEquals(vectors[1].length, 7);
  assertEquals(vectors[1].capacity, 10);
});

const arrayFromTests: TestSuite<void> = new TestSuite({
  name: "Array from",
});

test(arrayFromTests, "empty Vector", () => {
  const vector: Vector<number> = new Vector(5);
  const values: number[] = Array.from(vector);
  assertEquals(values, []);
  assertEquals(values.length, 0);
});

test(arrayFromTests, "Vector", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1]);
  vector.capacity = 10;
  const values = Array.from(vector);
  assertEquals(values, [-1, 0, 2, -2, 1]);
  assertEquals(values.length, 5);
});

test(arrayFromTests, "Vector with map", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1]);
  vector.capacity = 10;
  const values = Array.from(vector, (v: number) => 2 * v);
  assertEquals(values, [-2, 0, 4, -4, 2]);
  assertEquals(values.length, 5);
});

test(arrayFromTests, "Vector with map and thisArg", () => {
  const vector: Vector<number> = Vector.from([-1, 0, 2, -2, 1]);
  vector.capacity = 10;
  const math = new MyMath();
  const values = Array.from(
    vector,
    function (this: MyMath, v: number) {
      return this.multiply(3, v);
    },
    math,
  );
  assertEquals(values, [-3, 0, 6, -6, 3]);
  assertEquals(values.length, 5);
});
