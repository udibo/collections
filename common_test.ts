import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "./deps/std/testing/asserts.ts";
import { test, TestSuite } from "./deps/udibo/test_suite/mod.ts";
import { ascend } from "./comparators.ts";
import { count, range, shuffle, swap } from "./common.ts";

const commonTests = new TestSuite({ name: "common" });

test(commonTests, "swap", () => {
  const numbers: number[] = [5, 6, 7, 8, 9];
  swap(numbers, 0, 4);
  assertEquals(numbers, [9, 6, 7, 8, 5]);
  swap(numbers, 1, 3);
  assertEquals(numbers, [9, 8, 7, 6, 5]);
  swap(numbers, 2, 2);
  assertEquals(numbers, [9, 8, 7, 6, 5]);
  swap(numbers, 0, 7);
  assertEquals(numbers, [undefined, 8, 7, 6, 5, , , 9]);
});

test(commonTests, "range", () => {
  assertEquals([...range({ end: 10 })], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEquals([...range({ end: 10, step: 2 })], [0, 2, 4, 6, 8]);
  assertEquals(
    [...range({ start: -5, end: 5 })],
    [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4],
  );
  assertEquals(
    [...range({ start: -5, end: 5, step: 2 })],
    [-5, -3, -1, 1, 3],
  );

  assertEquals(
    [...range({ start: 10, end: 0, step: -1 })],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  );
  assertEquals(
    [...range({ start: 10, end: 0, step: -2 })],
    [10, 8, 6, 4, 2],
  );
  assertEquals(
    [...range({ start: 5, end: -5, step: -1 })],
    [5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
  );
  assertEquals(
    [...range({ start: 5, end: -5, step: -2 })],
    [5, 3, 1, -1, -3],
  );

  assertThrows(() => range({ end: -5 }).next(), Error, "invalid range");
});

test(commonTests, "count", () => {
  const values: number[] = [1, 0, -1, 1, 0, 2, -1, -2, 0];
  const result: Map<number, number> = count(values);
  const expectedKeys: number[] = [-2, -1, 0, 1, 2];
  assertEquals([...result.keys()].sort(ascend), expectedKeys);
  assertEquals(expectedKeys.map((key) => result.get(key)), [1, 2, 3, 2, 1]);
});

test(commonTests, "shuffle", () => {
  const originalValues: number[] = [1, 0, -1, 1, 0, 2, -1, -2, 0];
  const values: number[] = [1, 0, -1, 1, 0, 2, -1, -2, 0];
  const expectedKeys: number[] = [-2, -1, 0, 1, 2];
  let changes: boolean = false;
  for (let i = 0; i < 100; i++) {
    assertStrictEquals(shuffle(values), values);
    const result: Map<number, number> = count(values);
    assertEquals([...result.keys()].sort(ascend), expectedKeys);
    assertEquals(expectedKeys.map((key) => result.get(key)), [1, 2, 3, 2, 1]);
    changes ||= values.some((value, index) => value !== originalValues[index]);
  }
  assert(changes, "shuffle changes array");
});
