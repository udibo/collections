# Collections

[![version](https://img.shields.io/badge/release-v0.1.0-success)](https://github.com/udibo/collections/tree/v0.1.0)
[![CI](https://github.com/udibo/collections/workflows/CI/badge.svg)](https://github.com/udibo/collections/actions?query=workflow%3ACI)
[![deno version](https://img.shields.io/badge/deno-v1.0.0-success)](https://github.com/denoland/deno/tree/v1.0.0)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/udibo/collections/v0.1.0/mod.ts)
[![license](https://img.shields.io/github/license/udibo/collections)](https://github.com/udibo/collections/blob/master/LICENSE)

This module provides implementations of collection objects that are not standard built-in objects in JavaScript.

## Usage

### BinaryHeap<T\>

A priority queue implemented with a binary heap. The heap is in decending order by default,
using JavaScript's built in comparison operators to sort the elements.

See [deno docs](https://doc.deno.land/https/raw.githubusercontent.com/udibo/collections/v0.1.0/mod.ts#BinaryHeap) for more information.

#### Efficiency

| Method | Average Case | Worst Case |
|---|---|---|
| peek() | O(1) | O(1) |
| pop() | O(log n) | O(log n) |
| push(value) | O(1) | O(log n) |

#### Example

Creating and using max and min heaps:

```ts
import { BinaryHeap, ascend } from "https://raw.githubusercontent.com/udibo/collections/v0.1.0/binary_heap.ts";

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

## License

[MIT](LICENSE)
