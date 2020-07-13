import { assertEquals } from "./deps/std/testing/asserts.ts";
import { swap, range } from "./common.ts";
import { assertThrows } from "https://deno.land/std@0.59.0/testing/asserts.ts";
Deno.test("swap", () => {
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

Deno.test("range", () => {
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
