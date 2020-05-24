import { assertEquals } from "./deps/std/testing/asserts.ts";
import { BinaryHeap, ascend, descend } from "./binary_heap.ts";

Deno.test("BinaryHeap with default descend comparator", () => {
  const maxHeap: BinaryHeap<number> = new BinaryHeap();
  const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
  const expected: number[] = [100, 10, 9, 9, 9, 1, 0, -1, -9, -10, -100];
  let actual: number[] = [];

  assertEquals(maxHeap.length, 0);
  assertEquals(maxHeap.isEmpty(), true);
  assertEquals(maxHeap.peek(), undefined);
  for (let i = 0; i < values.length; i++) {
    assertEquals(maxHeap.push(values[i]), i + 1);
  }
  assertEquals(maxHeap.length, values.length);
  assertEquals(maxHeap.isEmpty(), false);
  while (!maxHeap.isEmpty()) {
    assertEquals(maxHeap.peek(), expected[actual.length]);
    actual.push(maxHeap.pop() as number);
    assertEquals(maxHeap.length, expected.length - actual.length);
    assertEquals(maxHeap.isEmpty(), actual.length === expected.length);
  }
  assertEquals(maxHeap.peek(), undefined);
  assertEquals(actual, expected);

  actual = [];
  assertEquals(maxHeap.push(...values), values.length);
  assertEquals(maxHeap.length, values.length);
  assertEquals(maxHeap.isEmpty(), false);
  assertEquals(maxHeap.peek(), expected[0]);
  for (let value of maxHeap) {
    actual.push(value);
    assertEquals(maxHeap.length, expected.length - actual.length);
    assertEquals(maxHeap.isEmpty(), actual.length === expected.length);
    assertEquals(maxHeap.peek(), expected[actual.length]);
  }
  assertEquals(actual, expected);
});

Deno.test("BinaryHeap with ascend comparator", () => {
  const minHeap: BinaryHeap<number> = new BinaryHeap(ascend);
  const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
  const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 9, 9, 10, 100];
  let actual: number[] = [];

  assertEquals(minHeap.length, 0);
  assertEquals(minHeap.isEmpty(), true);
  assertEquals(minHeap.peek(), undefined);
  for (let i = 0; i < values.length; i++) {
    assertEquals(minHeap.push(values[i]), i + 1);
  }
  assertEquals(minHeap.length, values.length);
  assertEquals(minHeap.isEmpty(), false);
  while (!minHeap.isEmpty()) {
    assertEquals(minHeap.peek(), expected[actual.length]);
    actual.push(minHeap.pop() as number);
    assertEquals(minHeap.length, expected.length - actual.length);
    assertEquals(minHeap.isEmpty(), actual.length === expected.length);
  }
  assertEquals(minHeap.peek(), undefined);
  assertEquals(actual, expected);

  actual = [];
  assertEquals(minHeap.push(...values), values.length);
  assertEquals(minHeap.length, values.length);
  assertEquals(minHeap.isEmpty(), false);
  assertEquals(minHeap.peek(), expected[0]);
  for (let value of minHeap) {
    actual.push(value);
    assertEquals(minHeap.length, expected.length - actual.length);
    assertEquals(minHeap.isEmpty(), actual.length === expected.length);
    assertEquals(minHeap.peek(), expected[actual.length]);
  }
  assertEquals(actual, expected);
});

class MyMath {
  multiply(a: number, b: number): number {
    return a * b;
  }
}

Deno.test("BinaryHeap from iterable", () => {
  const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
  const originalValues: number[] = Array.from(values);
  const expected: number[] = [100, 10, 9, 9, 9, 1, 0, -1, -9, -10, -100];
  let heap: BinaryHeap<number> = BinaryHeap.from(values);
  assertEquals(values, originalValues);
  assertEquals([...heap], expected);

  heap = BinaryHeap.from(values, { compare: ascend });
  assertEquals(values, originalValues);
  assertEquals([...heap].reverse(), expected);

  heap = BinaryHeap.from(values, {
    map: (v: number, k: number) => 2 * v,
  });
  assertEquals([...heap], expected.map((v: number) => 2 * v));

  const math = new MyMath();
  heap = BinaryHeap.from(values, {
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals(values, originalValues);
  assertEquals([...heap], expected.map((v: number) => 3 * v));

  heap = BinaryHeap.from(values, {
    compare: ascend,
    map: (v: number, k: number) => 2 * v,
  });
  assertEquals(values, originalValues);
  assertEquals([...heap].reverse(), expected.map((v: number) => 2 * v));

  heap = BinaryHeap.from(values, {
    compare: ascend,
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals(values, originalValues);
  assertEquals([...heap].reverse(), expected.map((v: number) => 3 * v));
});

Deno.test("BinaryHeap from BinaryHeap with default descend comparator", () => {
  const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
  const expected: number[] = [100, 10, 9, 9, 9, 1, 0, -1, -9, -10, -100];
  const maxHeap: BinaryHeap<number> = new BinaryHeap();
  maxHeap.push(...values);
  let heap: BinaryHeap<number> = BinaryHeap.from(maxHeap);
  assertEquals([...maxHeap], expected);
  assertEquals([...heap], expected);

  maxHeap.push(...values);
  heap = BinaryHeap.from(maxHeap, { compare: ascend });
  assertEquals([...maxHeap], expected);
  assertEquals([...heap].reverse(), expected);

  maxHeap.push(...values);
  heap = BinaryHeap.from(maxHeap, {
    map: (v: number, k: number) => 2 * v,
  });
  assertEquals([...maxHeap], expected);
  assertEquals([...heap], expected.map((v: number) => 2 * v));

  const math = new MyMath();
  maxHeap.push(...values);
  heap = BinaryHeap.from(maxHeap, {
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals([...maxHeap], expected);
  assertEquals([...heap], expected.map((v: number) => 3 * v));

  maxHeap.push(...values);
  heap = BinaryHeap.from(maxHeap, {
    compare: ascend,
    map: (v: number, k: number) => 2 * v,
  });
  assertEquals([...maxHeap], expected);
  assertEquals([...heap].reverse(), expected.map((v: number) => 2 * v));

  maxHeap.push(...values);
  heap = BinaryHeap.from(maxHeap, {
    compare: ascend,
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals([...maxHeap], expected);
  assertEquals([...heap].reverse(), expected.map((v: number) => 3 * v));
});

Deno.test("BinaryHeap from BinaryHeap with ascend comparator", () => {
  const values: number[] = [-10, 9, -1, 100, 9, 1, 0, 9, -100, 10, -9];
  const expected: number[] = [-100, -10, -9, -1, 0, 1, 9, 9, 9, 10, 100];
  const minHeap: BinaryHeap<number> = new BinaryHeap(ascend);
  minHeap.push(...values);
  let heap: BinaryHeap<number> = BinaryHeap.from(minHeap);
  assertEquals([...minHeap], expected);
  assertEquals([...heap], expected);

  minHeap.push(...values);
  heap = BinaryHeap.from(minHeap, { compare: descend });
  assertEquals([...minHeap], expected);
  assertEquals([...heap].reverse(), expected);

  minHeap.push(...values);
  heap = BinaryHeap.from(minHeap, {
    map: (v: number, k: number) => 2 * v,
  });
  assertEquals([...minHeap], expected);
  assertEquals([...heap], expected.map((v: number) => 2 * v));

  const math = new MyMath();
  minHeap.push(...values);
  heap = BinaryHeap.from(minHeap, {
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals([...minHeap], expected);
  assertEquals([...heap], expected.map((v: number) => 3 * v));

  minHeap.push(...values);
  heap = BinaryHeap.from(minHeap, {
    compare: descend,
    map: (v: number, k: number) => 2 * v,
  });
  assertEquals([...minHeap], expected);
  assertEquals([...heap].reverse(), expected.map((v: number) => 2 * v));

  minHeap.push(...values);
  heap = BinaryHeap.from(minHeap, {
    compare: descend,
    map: function (this: MyMath, v: number, k: number) {
      return this.multiply(3, v);
    },
    thisArg: math,
  });
  assertEquals([...minHeap], expected);
  assertEquals([...heap].reverse(), expected.map((v: number) => 3 * v));
});
