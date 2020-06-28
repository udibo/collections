# Collections

[![version](https://img.shields.io/badge/release-v0.2.0-success)](https://github.com/udibo/collections/tree/v0.2.0)
[![CI](https://github.com/udibo/collections/workflows/CI/badge.svg)](https://github.com/udibo/collections/actions?query=workflow%3ACI)
[![deno version](https://img.shields.io/badge/deno-v1.1.2-success)](https://github.com/denoland/deno/tree/v1.1.2)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/udibo/collections/v0.2.0/mod.ts)
[![license](https://img.shields.io/github/license/udibo/collections)](https://github.com/udibo/collections/blob/master/LICENSE)

This module provides implementations of collection objects that are not standard built-in objects in JavaScript.

## Usage

### BinaryHeap<T\>

A priority queue implemented with a binary heap. The heap is in decending order by default,
using JavaScript's built in comparison operators to sort the values.

See [deno docs](https://doc.deno.land/https/raw.githubusercontent.com/udibo/collections/v0.2.0/mod.ts#BinaryHeap) for more information.

#### BinaryHeap<T\> Efficiency

| Method | Average Case | Worst Case |
|---|---|---|
| peek() | O(1) | O(1) |
| pop() | O(log n) | O(log n) |
| push(value) | O(1) | O(log n) |

#### BinaryHeap<T\> Example

Creating and using max and min heaps:

```ts
import { BinaryHeap } from "https://raw.githubusercontent.com/udibo/collections/v0.2.0/binary_heap.ts";
import { ascend } from "https://raw.githubusercontent.com/udibo/collections/v0.2.0/comparators.ts";

const maxHeap: BinaryHeap<number> = new BinaryHeap();
maxHeap.push(...[4, 1, 3, 6, 2]); // 5
maxHeap.peek(); // 6
maxHeap.pop(); // 6
maxHeap.peek(); // 4
maxHeap.pop(); // 4

const minHeap: BinaryHeap<number> = new BinaryHeap(ascend);
maxHeap.push(...[4, 5, 3, 6, 2]);
maxHeap.peek(); // 2
maxHeap.pop(); // 2
maxHeap.peek(); // 3
maxHeap.pop(); // 3
```

### BSTree<T\>

An unbalanced binary search tree. The values are in ascending order by default,
using JavaScript's built in comparison operators to sort the values.

See [deno docs](https://doc.deno.land/https/raw.githubusercontent.com/udibo/collections/v0.2.0/mod.ts#BSTree) for more information.

#### BSTree<T\> Efficiency

I recommend not using this due to its worst case. Instead you should use an AVL Tree or Red-Black Tree.
AVL Trees are more strictly balanced than Red-Black Trees, so they can provide faster lookups.
Red-Black Trees require fewer rotations than AVL Trees, so they can provide faster insertions and removal operations.

| Method | Average Case | Worst Case |
|---|---|---|
| find(value) | O(log n) | O(n) |
| insert(value) | O(log n) | O(n) |
| remove(value) | O(log n) | O(n) |
| min() | O(log n) | O(n) |
| max() | O(log n) | O(n) |

### RBTree<T\>

A red-black tree. The values are in ascending order by default,
using JavaScript's built in comparison operators to sort the values.

See [deno docs](https://doc.deno.land/https/raw.githubusercontent.com/udibo/collections/v0.2.0/mod.ts#RBTree) for more information.

#### RBTree<T\> Efficiency

Red-Black Trees require fewer rotations than AVL Trees,
so they can provide faster insertions and removal operations.
If you need faster lookups, you should use an AVL Tree instead.

| Method | Average Case | Worst Case |
|---|---|---|
| find(value) | O(log n) | O(log n) |
| insert(value) | O(log n) | O(log n) |
| remove(value) | O(log n) | O(log n) |
| min() | O(log n) | O(log n) |
| max() | O(log n) | O(log n) |

## License

[MIT](LICENSE)
