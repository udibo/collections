import { assertEquals } from "./deps/std/testing/asserts.ts";
import { swap } from "./common.ts";

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
