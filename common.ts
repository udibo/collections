export type compare<T> = (a: T, b: T) => number;
export type map<T, U> = (v: T, k: number) => U;

/** Swaps the values at two indexes in an array. */
export function swap<T>(array: T[], a: number, b: number) {
  const temp: T = array[a];
  array[a] = array[b];
  array[b] = temp;
}
