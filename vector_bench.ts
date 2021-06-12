import { bench, BenchmarkTimer, runBenchmarks } from "./test_deps.ts";
import { range, shuffle, Vector } from "./mod.ts";

const runs = 100;
const count = 25000;
const start: number = -(count / 2);
const end: number = count / 2;
const values: number[] = shuffle([...range({ start, end })]);

bench({
  name: `Array push ${count} times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector push ${count} times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector push ${count} times with initial capacity of ${count}`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.push(values[i]);
    b.stop();
  },
});

bench({
  name: `Array pop ${count} times`,
  runs,
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
  runs,
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
  runs,
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
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < count; i++) numbers.unshift(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector unshift ${count} times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < count; i++) numbers.unshift(values[i]);
    b.stop();
  },
});

bench({
  name: `Vector unshift ${count} times with initial capacity of ${count}`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.unshift(values[i]);
    b.stop();
  },
});

bench({
  name: `Array shift ${count} times`,
  runs,
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
  runs,
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
  runs,
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
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < 1000; i++) numbers.length = values[i] + 12500;
    b.stop();
  },
});

bench({
  name: "Vector set length 1000 times",
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector();
    b.start();
    for (let i = 0; i < 1000; i++) numbers.length = values[i] + 12500;
    b.stop();
  },
});

bench({
  name: "Vector set length 1000 times with initial capacity of 1000",
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(1000);
    b.start();
    for (let i = 0; i < 1000; i++) numbers.length = values[i] + 12500;
    b.stop();
  },
});

bench({
  name: "Vector set capacity 1000 times",
  runs,
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
  runs,
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
  runs,
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
  runs,
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
  runs,
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
  runs,
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
  runs,
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
  runs,
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
  runs,
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
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: number[] = [];
    b.start();
    for (let i = 0; i < count; i++) numbers[i] = values[i];
    b.stop();
  },
});

bench({
  name: `Vector set next index ${count} times`,
  runs,
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
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.set(i, values[i]);
    b.stop();
  },
});

bench({
  name: `Vector set next start index ${count} times`,
  runs,
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
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(25000);
    b.start();
    for (let i = 0; i < count; i++) numbers.set(-1 - i, values[i]);
    b.stop();
  },
});

bench({
  name: `Array set index ${count} times`,
  runs,
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
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number> = new Vector(count);
    numbers.length = count;
    b.start();
    for (let i = 0; i < count; i++) numbers.set(i, values[i]);
    b.stop();
  },
});

bench({
  name: `Array concat Array 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: number[][] = [
      values.slice(0, count / 2),
      values.slice(count / 2, count),
    ];
    b.start();
    for (let i = 0; i < 100; i++) numbers[0].concat(numbers[1]);
    b.stop();
  },
});

bench({
  name: `Vector concat Array 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const value: Vector<number> = Vector.from(values.slice(0, count / 2));
    const numbers: number[] = values.slice(count / 2, count);
    b.start();
    for (let i = 0; i < 100; i++) value.concat(numbers);
    b.stop();
  },
});

bench({
  name: `Array concat multiple Arrays 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: number[][] = [
      values.slice(0, count / 4),
      values.slice(count / 4, 2 * (count / 4)),
      values.slice(2 * (count / 4), 3 * (count / 4)),
      values.slice(3 * (count / 4), count),
    ];
    b.start();
    for (let i = 0; i < 100; i++) {
      numbers[0].concat(numbers[1], numbers[2], numbers[3]);
    }
    b.stop();
  },
});

bench({
  name: `Vector concat multiple Arrays 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const value: Vector<number> = Vector.from(values.slice(0, count / 4));
    const numbers: number[][] = [
      values.slice(count / 4, 2 * (count / 4)),
      values.slice(2 * (count / 4), 3 * (count / 4)),
      values.slice(3 * (count / 4), count),
    ];
    b.start();
    for (let i = 0; i < 100; i++) {
      value.concat(numbers[0], numbers[1], numbers[2]);
    }
    b.stop();
  },
});

bench({
  name: `Array concat Vector 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const value: number[] = values.slice(0, count / 2);
    const numbers: Vector<number> = Vector.from(values.slice(count / 2, count));
    b.start();
    for (let i = 0; i < 100; i++) value.concat(numbers.toArray());
    b.stop();
  },
});

bench({
  name: `Vector concat Vector 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number>[] = [
      Vector.from(values.slice(0, count / 2)),
      Vector.from(values.slice(count / 2, count)),
    ];
    b.start();
    for (let i = 0; i < 100; i++) numbers[0].concat(numbers[1]);
    b.stop();
  },
});

bench({
  name: `Array concat multiple Vectors 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const value: number[] = values.slice(0, count / 4);
    const numbers: Vector<number>[] = [
      Vector.from(values.slice(count / 4, 2 * (count / 4))),
      Vector.from(values.slice(2 * (count / 4), 3 * (count / 4))),
      Vector.from(values.slice(3 * (count / 4), count)),
    ];
    b.start();
    for (let i = 0; i < 100; i++) {
      value.concat(
        numbers[0].toArray(),
        numbers[1].toArray(),
        numbers[2].toArray(),
      );
    }
    b.stop();
  },
});

bench({
  name: `Vector concat multiple Vectors 100 times`,
  runs,
  func: (b: BenchmarkTimer) => {
    const numbers: Vector<number>[] = [
      Vector.from(values.slice(0, count / 4)),
      Vector.from(values.slice(count / 4, 2 * (count / 4))),
      Vector.from(values.slice(2 * (count / 4), 3 * (count / 4))),
      Vector.from(values.slice(3 * (count / 4), count)),
    ];
    b.start();
    for (let i = 0; i < 100; i++) {
      numbers[0].concat(numbers[1], numbers[2], numbers[3]);
    }
    b.stop();
  },
});

if (import.meta.main) runBenchmarks();
