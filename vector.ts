/** This module is browser compatible. */

import { map } from "./common.ts";

const maxCapacity: number = Math.pow(2, 32) - 1;

function reduce<T, U>(
  iterator: IterableIterator<T>,
  length: number,
  step: -1 | 1,
  callback: (previousValue: U, currentValue: T, currentIndex: number) => U,
  initialValue?: U,
): U {
  if (typeof initialValue === "undefined" && length === 0) {
    throw new TypeError("reduce of empty vector with no initial value");
  }
  let result: U;
  let index: number = step < 0 ? length - 1 : 0;
  if (typeof initialValue === "undefined") {
    result = iterator.next().value;
    index += step;
  } else {
    result = initialValue;
  }
  for (let current of iterator) {
    result = callback(result, current, index);
    index += step;
  }
  return result;
}

/**
 * A double-ended queue implemented with a growable ring buffer.
 * Vector is faster than JavaScript's built in Array class for shifting and unshifting
 * because it only requires reallocation when increasing the capacity.
 */
export class Vector<T> implements Iterable<T> {
  private data: (T | undefined)[];
  private _capacity = 0;
  private _length = 0;
  private start = 0;
  private end = -1;

  constructor(capacity: number = 0) {
    if (
      typeof capacity !== "number" || capacity < 0 ||
      Math.floor(capacity) !== capacity || capacity > maxCapacity
    ) {
      throw new TypeError("invalid capacity");
    }
    this._capacity = capacity;
    this.data = [];
    this.data.length = capacity;
  }

  /** Creates a new vector from an array like or iterable object. */
  static from<T, U, V>(
    collection: ArrayLike<T> | Iterable<T>,
  ): Vector<U>;
  static from<T, U, V>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      map: map<T, U>;
      thisArg?: V;
    },
  ): Vector<U>;
  static from<T, U, V>(
    collection: ArrayLike<T> | Iterable<T>,
    options?: {
      map: map<T, U>;
      thisArg?: V;
    },
  ): Vector<U> {
    let result: Vector<U> = new Vector();
    let data = collection instanceof Vector ? collection.data : collection;
    result.data = typeof options?.map === "undefined"
      ? Array.from(data) as unknown as U[]
      : collection instanceof Vector
      ? collection.length === 0 ? [] : Array.prototype.map.call(
        data,
        (value: T, index: number) => {
          if (collection.start <= collection.end) {
            if (index >= collection.start && index <= collection.end) {
              return options?.map.call(options?.thisArg, value, index);
            }
          } else {
            if (index <= collection.end || index >= collection.start) {
              return options?.map.call(options?.thisArg, value, index);
            }
          }
          return ((collection.start <= collection.end &&
              index >= collection.start && index <= collection.end) ||
              (collection.start > collection.end &&
                (index <= collection.end || index >= collection.start)))
            ? options?.map.call(options?.thisArg, value, index)
            : value;
        },
      ) as U[]
      : Array.from(data, options?.map, options?.thisArg);
    if (collection instanceof Vector) {
      result._capacity = collection.capacity;
      result._length = collection.length;
      result.start = collection.start;
      result.end = collection.end;
    } else {
      result._length = result.data.length;
      result._capacity = result._length;
      result.start = 0;
      result.end = result._length - 1;
    }
    return result;
  }

  /**
   * The amount of values stored in the vector.
   * You can set the length to truncate the vector.
   * If you increase the length by setting it, the new slots will be empty.
   */
  get length(): number {
    return this._length;
  }
  set length(value: number) {
    if (value === 0) {
      if (this.length !== 0) this.data = [];
      this.data.length = this.capacity;
      this.start = 0;
      this.end = -1;
    } else if (
      value < 0 || typeof value !== "number" || Math.floor(value) !== value ||
      value > maxCapacity
    ) {
      throw new RangeError("invalid length");
    } else if (value < this.length) {
      const previousEnd: number = this.end;
      this.end = (this.start + value - 1) % this.capacity;
      if (previousEnd < this.start && this.end >= this.start) {
        this.data.fill(undefined, this.end + 1, this.capacity);
        this.data.fill(undefined, 0, previousEnd + 1);
      } else {
        this.data.fill(undefined, this.end + 1, previousEnd + 1);
      }
    } else if (value > this.capacity) {
      this.capacity = value;
      this.end = (this.start + value - 1) % this.capacity;
    } else if (value > this.length) {
      this.end = (this.start + value - 1) % this.capacity;
    }
    this._length = value;
  }

  /**
   * The vector will be able to hold this many values without reallocating.
   * If the length exceeds the capacity, then the capacity will be increased.
   * Changing the capacity may trigger reallocation.
   * Changing the capacity to less than the length will change
   * the length to be equal to the new capacity.
   */
  get capacity(): number {
    return this._capacity;
  }
  set capacity(value: number) {
    if (value === 0) {
      if (this.length !== 0) {
        this.data = [];
        this._length = 0;
      }
      this.start = 0;
      this.end = -1;
    } else if (
      value < 0 || typeof value !== "number" || Math.floor(value) !== value ||
      value > maxCapacity
    ) {
      throw new RangeError("invalid capacity");
    } else if (value < this.length) {
      this._length = value;
      this.end = (this.start + value - 1) % this.capacity;
      if (this.end >= this.start) {
        this.data = this.data.slice(this.start, this.end + 1);
      } else {
        this.data = this.data
          .slice(this.start, this.capacity)
          .concat(this.data.slice(0, this.end + 1));
      }
      this.start = 0;
      this.end = value - 1;
    } else if (this.end < this.start && value !== this.capacity) {
      this.data = this.data
        .slice(this.start, this.capacity)
        .concat(this.data.slice(0, this.end + 1));
      this.start = 0;
      this.end = this.start + this.length - 1;
    } else if (this.end >= value) {
      this.data = this.data.slice(this.start, this.end + 1);
      this.start = 0;
      this.end = this.start + this.length - 1;
    }
    this.data.length = value;
    this._capacity = value;
  }

  /**
   * Returns the value at the given index.
   * If the value is negative, it will be subtracted from the end.
   * The index 0 would return the first value in the vector.
   * The index -1 would return the last value in the vector.
   */
  get(index: number): T | undefined {
    if (index < -this.length || index >= this.length) return;
    index = (this.start + index) % this.capacity;
    if (index < 0) index = this.capacity + index;
    return this.data[index];
  }

  /**
   * Sets the value at the given index, then returns the value.
   * If the value is negative, it will be subtracted from the end.
   * The index 0 would set the first value in the vector.
   * The index -1 would set the last value in the vector.
   * If the absolute index value is greater than the length,
   * the size will be increased to match before setting the value.
   */
  set(index: number, value: T) {
    const offset: number = (index < 0 ? Math.abs(index) : (index + 1)) -
      this.length;
    if (offset > 0) {
      let newLength: number = this.length + offset;
      let newCapacity: number = this.capacity || 1;
      while (newCapacity < newLength) newCapacity *= 2;
      this.capacity = newCapacity;
      this.length = newLength;
    }
    if (index < 0) {
      if (offset > 0) {
        this.start -= offset;
        this.end -= offset;
        if (this.start < 0) this.start = this.capacity + this.start;
        if (this.end < 0) this.end = this.capacity + this.end;
      }
      index = this.end + index + 1;
      if (index < 0) index = this.capacity + index;
    } else {
      index = this.start + index % this.capacity;
    }
    this.data[index] = value;
    return value;
  }

  /** Shrinks the capacity to be equal to the length. */
  shrinkToFit(): void {
    this.capacity = this.length;
  }

  /** Returns the first value in the vector, or undefined if it is empty. */
  peek(): T | undefined {
    return this.data[this.start];
  }

  /** Removes the first value from the vector and returns it, or undefined if it is empty. */
  shift(): T | undefined {
    const result = this.data[this.start];
    if (this.length > 0) {
      this.data[this.start] = undefined;
      this._length--;
      this.start = this.start === this.capacity
        ? 0
        : ((this.start + 1) % this.capacity);
    }
    return result;
  }

  /** Adds values to the start of the vector. */
  unshift(...values: T[]): number {
    const newLength: number = this.length + values.length;
    let newCapacity: number = this.capacity || 1;
    while (newCapacity < newLength) newCapacity *= 2;
    this.capacity = newCapacity;
    this.length = newLength;
    this.start = values.length < this.start
      ? (this.start - values.length)
      : (this.capacity - values.length + this.start);
    this.end = (this.start + this.length - 1) % this.capacity;
    let index: number = this.start;
    for (const value of values) {
      this.data[index++ % this.capacity] = value;
    }
    return this.length;
  }

  /** Returns the last value in the vector, or undefined if it is empty. */
  peekRight(): T | undefined {
    return this.data[this.end];
  }

  /** Removes the last value from the vector and returns it, or undefined if it is empty. */
  pop(): T | undefined {
    const result = this.data[this.end];
    if (this.length > 0) {
      this.data[this.end] = undefined;
      this._length--;
      this.end = (this.end || this.capacity) - 1;
    }
    return result;
  }

  /** Adds values to the end of the vector. */
  push(...values: T[]): number {
    const oldLength: number = this.length;
    const newLength: number = oldLength + values.length;
    let newCapacity: number = this.capacity || 1;
    while (newCapacity < newLength) newCapacity *= 2;
    this.capacity = newCapacity;
    this.length = newLength;
    let index: number = (this.start + oldLength) % this.capacity;
    for (const value of values) {
      this.data[index++ % this.capacity] = value;
    }
    return this.length;
  }

  /**
   * Applies a function against an accumulator and each value of the vector (from left-to-right) to reduce it to a single value.
   * If no initial value is supplied, the first value in the vector will be used and skipped.
   * Calling reduce on an empty array without an initial value creates a TypeError.
   */
  reduce<U>(
    callback: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue?: U,
  ): U {
    return reduce(this.values(), this.length, 1, callback, initialValue);
  }

  /**
   * Applies a function against an accumulator and each value of the vector (from right-to-left) to reduce it to a single value.
   * If no initial value is supplied, the last value in the vector will be used and skipped.
   * Calling reduce on an empty array without an initial value creates a TypeError.
   */
  reduceRight<U>(
    callback: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue?: U,
  ): U {
    return reduce(this.valuesRight(), this.length, -1, callback, initialValue);
  }

  /** Checks if the vector is empty. */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /** Returns an iterator for retrieving and removing values from the vector (from left-to-right). */
  *drain(): IterableIterator<T> {
    while (!this.isEmpty()) {
      yield this.shift() as T;
    }
  }

  /** Returns an iterator for retrieving and removing values from the vector (from right-to-left). */
  *drainRight(): IterableIterator<T> {
    while (!this.isEmpty()) {
      yield this.pop() as T;
    }
  }

  /** Returns an iterator for retrieving values from the vector (from left-to-right). */
  *values(): IterableIterator<T> {
    let offset = 0;
    while (offset < this.length) {
      let idx = (this.start + offset++) % this.capacity;
      yield this.data[idx] as T;
    }
  }

  /** Returns an iterator for retrieving values from the vector (from right-to-left). */
  *valuesRight(): IterableIterator<T> {
    let offset = 0;
    while (offset < this.length) {
      let index = this.end - offset++;
      if (index < 0) index = this.capacity + index;
      yield this.data[index] as T;
    }
  }

  /** Returns an iterator for retrieving values from the vector (from left-to-right). */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this.values();
  }
}