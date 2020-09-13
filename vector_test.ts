import {
  assert,
  assertEquals,
  assertThrows,
} from "./deps/std/testing/asserts.ts";
import { TestSuite, test } from "./deps/udibo/test_suite/mod.ts";
import { Vector } from "./vector.ts";
import { MyMath } from "./test_common.ts";

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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
  assertThrows(
    () => vector.length = "5" as unknown as number,
    RangeError,
    "invalid length",
  );
  assertThrows(() => vector.length = -1, RangeError, "invalid length");
  assertThrows(() => vector.length = 6.5, RangeError, "invalid length");
  assertThrows(
    () => vector.length = Math.pow(2, 32),
    RangeError,
    "invalid length",
  );
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
});

test(lengthTests, "set below current length", () => {
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
  assertThrows(
    () => vector.capacity = "5" as unknown as number,
    RangeError,
    "invalid capacity",
  );
  assertThrows(() => vector.capacity = -1, RangeError, "invalid capacity");
  assertThrows(() => vector.capacity = 6.5, RangeError, "invalid capacity");
  assertThrows(
    () => vector.capacity = Math.pow(2, 32),
    RangeError,
    "invalid capacity",
  );
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 4);
});

test(capacityTests, "set to length", () => {
  let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(5);
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
    let vector: Vector<number> = new Vector(5);
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
    let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(5);
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
  let vector: Vector<number> = new Vector(3);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 3);
  vector.shrinkToFit();
  assertEquals([...vector], []);
  assertEquals(vector.length, 0);
  assertEquals(vector.capacity, 0);
});

test(shrinkToFitTests, "unchanged", () => {
  let vector: Vector<number> = new Vector(3);
  vector = new Vector(3);
  vector.push(11, 12, 13);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
  vector.shrinkToFit();
  assertEquals([...vector], [11, 12, 13]);
  assertEquals(vector.length, 3);
  assertEquals(vector.capacity, 3);
});

test(vectorTests, "get", () => {
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(7), undefined);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(4), undefined);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(-5), undefined);
  assertEquals([...vector], [13, 14, 11, 12]);
  assertEquals(vector.delete(0), 13);
  assertEquals([...vector], [14, 11, 12]);
  assertEquals(vector.delete(2), 12);
  assertEquals([...vector], [14, 11]);
  assertEquals(vector.delete(1), 11);
  assertEquals([...vector], [14]);
  assertEquals(vector.delete(0), 14);
  assertEquals([...vector], []);
});

test(vectorTests, "values/valuesRight", () => {
  let vector: Vector<number> = new Vector(6);
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
  let vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);

  let expectedIndex = 1;
  function sumReducer(sum: number, cur: number, idx: number): number {
    assertEquals(idx, expectedIndex++);
    return (sum ?? 0) + cur;
  }

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
  let vector: Vector<number> = new Vector(6);
  vector.push(11, 12);
  vector.unshift(13, 14);
  assertEquals([...vector], [13, 14, 11, 12]);

  let expectedIndex = 2;
  function sumReducer(sum: number, cur: number, idx: number): number {
    assertEquals(idx, expectedIndex--);
    return (sum ?? 0) + cur;
  }

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
  let vector: Vector<number> = new Vector(4);
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
  let vector: Vector<number> = new Vector(4);
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
    map: (value: number) => 2 * value,
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
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
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
    map: (value: number) => 2 * value,
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
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
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
  let vectors: Vector<number>[] = [new Vector(5)];
  vectors.push(Vector.from(vectors[0]));
  assertEquals([...vectors[1]], []);
  assertEquals(vectors[1].length, 0);
  assertEquals(vectors[1].capacity, 5);
});

test(fromTests, "Vector", () => {
  let vectors: Vector<number>[] = [Vector.from([-1, 0, 2, -2, 1])];
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
  let vectors: Vector<number>[] = [Vector.from([-1, 0, 2, -2, 1])];
  vectors[0].capacity = 10;
  vectors.push(Vector.from(vectors[0], {
    map: (value: number) => 2 * value,
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
  let vectors: Vector<number>[] = [Vector.from([-1, 0, 2, -2, 1])];
  vectors[0].capacity = 10;
  const math = new MyMath();
  vectors.push(Vector.from(vectors[0], {
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
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
    function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    math,
  );
  assertEquals(values, [-3, 0, 6, -6, 3]);
  assertEquals(values.length, 5);
});
