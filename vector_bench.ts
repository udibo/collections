import {
  BenchmarkTimer,
  bench,
  runBenchmarks,
} from "./deps/std/testing/bench.ts";
import { Vector } from "./vector.ts";
import { range, shuffle } from "./common.ts";

const count = 25000;
const start: number = -(count / 2);
const end: number = count / 2;
const values: number[] = shuffle([...range({ start, end })]);

bench({
  name: `Array push ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector push ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector push ${count} times with initial capacity of ${count}`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.stop();
  },
});

bench({
  name: `Array pop ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < count; i++) numbers.pop();
    b.stop();
  },
});

bench({
  name: `Vector pop ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < count; i++) numbers.pop();
    b.stop();
  },
});

bench({
  name: `Vector pop ${count} times with initial capacity of ${count}`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < count; i++) numbers.pop();
    b.stop();
  },
});

bench({
  name: `Array unshift ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < count; i++) numbers.unshift(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector unshift ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < count; i++) numbers.unshift(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector unshift ${count} times with initial capacity of ${count}`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.unshift(values[i]);
    b.stop();
  },
});

bench({
  name: `Array shift ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < count; i++) numbers.shift();
    b.stop();
  },
});

bench({
  name: `Vector shift ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < count; i++) numbers.shift();
    b.stop();
  },
});

bench({
  name: `Vector shift ${count} times with initial capacity of ${count}`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < count; i++) numbers.shift();
    b.stop();
  },
});

bench({
  name: "Array set length 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < 1000; i++) numbers.length = values[i] + 12500;
    b.stop();
  },
});

bench({
  name: "Vector set length 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < 1000; i++) numbers.length = values[i] + 12500;
    b.stop();
  },
});

bench({
  name: "Vector set length 1000 times with initial capacity of 1000",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(1000);
    b.start();
    for (let i = 0; i < 1000; i++) numbers.length = values[i] + 12500;
    b.stop();
  },
});

bench({
  name: "Vector set capacity 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    numbers.push(1);
    b.start();
    for (let i = 0; i < 1000; i++) numbers.capacity = values[i] + 12501;
    b.stop();
  },
});

bench({
  name: "Array from Array 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Array.from(numbers);
    b.stop();
  },
});

bench({
  name: "Vector from Array 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Vector.from(numbers);
    b.stop();
  },
});

bench({
  name: "Array from Iterable 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Array.from(numbers.values());
    b.stop();
  },
});

bench({
  name: "Vector from Iterable 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Vector.from(numbers.values());
    b.stop();
  },
});

bench({
  name: "Array from Vector 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Array.from(numbers);
    b.stop();
  },
});

bench({
  name: "Vector from Vector 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Vector.from(numbers);
    b.stop();
  },
});

bench({
  name: "Array from Vector values 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Array.from(numbers.values());
    b.stop();
  },
});

bench({
  name: "Vector from Vector values 1000 times",
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    for (let i = 0; i < 1000; i++) numbers.push(values[i]);
    b.start();
    for (let i = 0; i < 1000; i++) Vector.from(numbers.values());
    b.stop();
  },
});

bench({
  name: `Array set next index ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < count; i++) numbers[i] = values[i];
    b.stop();
  },
});

bench({
  name: `Vector set next index ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < count; i++) numbers.set(i, values[i]);
    b.stop();
  },
});

bench({
  name:
    `Vector set next index ${count} times with initial capacity of ${count}`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.set(i, values[i]);
    b.stop();
  },
});

bench({
  name: `Vector set next start index ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < count; i++) numbers.set(-1 - i, values[i]);
    b.stop();
  },
});

bench({
  name:
    `Vector set next start index ${count} times with initial capacity of ${count}`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.set(-1 - i, values[i]);
    b.stop();
  },
});

bench({
  name: `Array set index ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    numbers.length = count;
    b.start();
    for (let i = 0; i < count; i++) numbers[i] = values[i];
    b.stop();
  },
});

bench({
  name: `Vector set index ${count} times`,
  runs: 100,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(count);
    numbers.length = count;
    b.start();
    for (let i = 0; i < count; i++) numbers.set(i, values[i]);
    b.stop();
  },
});

if (import.meta.main) runBenchmarks();
