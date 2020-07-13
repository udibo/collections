import {
  BenchmarkTimer,
  bench,
  runBenchmarks,
} from "../deps/std/testing/bench.ts";
import { BSTree } from "./bs_tree.ts";
import { RBTree } from "./rb_tree.ts";
import { range, shuffle } from "../common.ts";
const Trees: (typeof BSTree)[] = [BSTree, RBTree];
const count: number = 10000;
const start: number = -(count / 2);
const end: number = count / 2;
const values: number[] = shuffle([...range({ start, end })]);

for (const Tree of Trees) {
  const randomTree: BSTree<number> = new Tree();
  for (const value of values) randomTree.insert(value);

  const ascendingTree: BSTree<number> = new Tree();
  const descendingTree: BSTree<number> = new Tree();
  for (let i = start; i < end; i++) {
    ascendingTree.insert(i);
    descendingTree.insert(end - 1 - i);
  }

  bench({
    name: `${Tree.name} find average case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      b.start();
      for (let i = 0; i < count; i += 10) randomTree.find(values[i]);
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} find worst case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      b.start();
      for (let i = start; i < end; i += 10) ascendingTree.find(values[i]);
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} insert average case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      const tree: BSTree<number> = new Tree();
      b.start();
      for (let i = 0; i < 1000; i++) tree.insert(values[i]);
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} insert worst case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      const tree: BSTree<number> = new Tree();
      b.start();
      for (let i = -500; i < 500; i++) tree.insert(i);
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} remove average case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      const tree: BSTree<number> = new Tree();
      const randomIndexes: number[] = shuffle(
        [...range({ start: 0, end: 1000 })],
      );
      for (let i = 0; i < 1000; i++) tree.insert(values[i]);
      b.start();
      for (const index of randomIndexes) tree.remove(values[index]);
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} remove worst case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      const tree: BSTree<number> = new Tree();
      const values: number[] = [];
      for (let i = -500; i < 500; i++) {
        tree.insert(i);
        values.push(-i);
      }
      b.start();
      for (const value of values) tree.remove(value);
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} min average case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      b.start();
      for (let i = 0; i < 1000; i++) randomTree.min();
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} min worst case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      b.start();
      for (let i = 0; i < 1000; i++) descendingTree.min();
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} max average case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      b.start();
      for (let i = 0; i < 1000; i++) randomTree.max();
      b.stop();
    },
  });

  bench({
    name: `${Tree.name} max worst case`,
    runs: 100,
    func: (b: BenchmarkTimer) => {
      b.start();
      for (let i = 0; i < 1000; i++) ascendingTree.max();
      b.stop();
    },
  });
}

if (import.meta.main) runBenchmarks();
