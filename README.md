# Collections

[![version](https://img.shields.io/badge/release-0.11.2-success)](https://github.com/udibo/collections/tree/0.11.2)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/collections@0.11.2/mod.ts)
[![CI](https://github.com/udibo/collections/workflows/CI/badge.svg)](https://github.com/udibo/collections/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/udibo/collections/branch/main/graph/badge.svg?token=JYYBU68VCT)](https://codecov.io/gh/udibo/collections)
[![license](https://img.shields.io/github/license/udibo/collections)](https://github.com/udibo/collections/blob/master/LICENSE)

Collection classes that are not standard built-in objects in JavaScript. This
includes a vector, binary heap, binary search tree, and a red-black tree.

## Installation

This is an ES Module written in TypeScript and can be used in Deno projects. ES
Modules are the official standard format to package JavaScript code for reuse. A
JavaScript bundle is provided with each release so that it can be used in
Node.js packages or web browsers.

### Deno

To include it in a Deno project, you can import directly from the TS files. This
module is available in Deno's third part module registry but can also be
imported directly from GitHub using raw content URLs.

```ts
// Import from Deno's third party module registry
import { Vector } from "https://deno.land/x/collections@0.11.2/mod.ts";
// Import from GitHub
import { Vector } "https://raw.githubusercontent.com/udibo/collections/0.11.2/mod.ts";
```

If you do not need all of the sub-modules, you can choose to just import the
sub-modules you need.

```ts
// Import from Deno's third party module registry
import { Vector } from "https://deno.land/x/collections@0.11.2/vector.ts";
// Import from GitHub
import { Vector } from "https://raw.githubusercontent.com/udibo/collections/0.11.2/vector.ts";
```

### Node.js

Node.js fully supports ES Modules.

If a Node.js package has the type "module" specified in its package.json file,
the JavaScript bundle can be imported as a `.js` file.

```js
import { Vector } from "./collections_0.11.2.js";
```

The default type for Node.js packages is "commonjs". To import the bundle into a
commonjs package, the file extension of the JavaScript bundle must be changed
from `.js` to `.mjs`.

```js
import { Vector } from "./collections_0.11.2.mjs";
```

See [Node.js Documentation](https://nodejs.org/api/esm.html) for more
information.

### Browser

Most modern browsers support ES Modules.

The JavaScript bundle can be imported into ES modules. Script tags for ES
modules must have the type attribute set to "module".

```html
<script type="module" src="main.js"></script>
```

```js
// main.js
import { Vector } from "./collections_0.11.2.js";
```

You can also embed a module script directly into an HTML file by placing the
JavaScript code within the body of the script tag.

```html
<script type="module">
  import { Vector } from "./collections_0.11.2.js";
</script>
```

See
[MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
for more information.

## Usage

### Vector

A double-ended queue implemented with a growable ring buffer. Vector is faster
than JavaScript's built in Array class for unshifting and shifting because it
only requires reallocation when increasing the capacity.

See
[deno docs](https://doc.deno.land/https/deno.land/x/collections@0.11.2/mod.ts#Vector)
for more information.

### BinaryHeap

A priority queue implemented with a binary heap. The heap is in decending order
by default, using JavaScript's built in comparison operators to sort the values.

See
[deno docs](https://doc.deno.land/https/deno.land/x/collections@0.11.2/mod.ts#BinaryHeap)
for more information.

#### BinaryHeap Efficiency

| Method      | Average Case | Worst Case |
| ----------- | ------------ | ---------- |
| peek()      | O(1)         | O(1)       |
| pop()       | O(log n)     | O(log n)   |
| push(value) | O(1)         | O(log n)   |

#### Example

Creating and using max and min heaps:

```ts
import {
  ascend,
  BinaryHeap,
} from "https://deno.land/x/collections@0.11.2/mod.ts";

const maxHeap: BinaryHeap<number> = new BinaryHeap();
maxHeap.push(...[4, 1, 3, 6, 2]); // 5
maxHeap.peek(); // 6
maxHeap.pop(); // 6
maxHeap.peek(); // 4
maxHeap.pop(); // 4

const minHeap: BinaryHeap<number> = new BinaryHeap<number>(ascend);
minHeap.push(...[4, 5, 3, 6, 2]);
minHeap.peek(); // 2
minHeap.pop(); // 2
minHeap.peek(); // 3
minHeap.pop(); // 3
```

### BSTree

An unbalanced binary search tree. The values are in ascending order by default,
using JavaScript's built in comparison operators to sort the values.

See
[deno docs](https://doc.deno.land/https/deno.land/x/collections@0.11.2/mod.ts#BSTree)
for more information.

#### BSTree Efficiency

I recommend not using this due to its worst case. Instead you should use an AVL
Tree or Red-Black Tree. AVL Trees are more strictly balanced than Red-Black
Trees, so they can provide faster lookups. Red-Black Trees require fewer
rotations than AVL Trees, so they can provide faster insertions and removal
operations.

| Method        | Average Case | Worst Case |
| ------------- | ------------ | ---------- |
| find(value)   | O(log n)     | O(n)       |
| insert(value) | O(log n)     | O(n)       |
| remove(value) | O(log n)     | O(n)       |
| min()         | O(log n)     | O(n)       |
| max()         | O(log n)     | O(n)       |

### RBTree

A red-black tree. The values are in ascending order by default, using
JavaScript's built in comparison operators to sort the values.

See
[deno docs](https://doc.deno.land/https/deno.land/x/collections@0.11.2/mod.ts#RBTree)
for more information.

#### RBTree Efficiency

Red-Black Trees require fewer rotations than AVL Trees, so they can provide
faster insertions and removal operations. If you need faster lookups, you should
use an AVL Tree instead.

| Method        | Average Case | Worst Case |
| ------------- | ------------ | ---------- |
| find(value)   | O(log n)     | O(log n)   |
| insert(value) | O(log n)     | O(log n)   |
| remove(value) | O(log n)     | O(log n)   |
| min()         | O(log n)     | O(log n)   |
| max()         | O(log n)     | O(log n)   |

## License

[MIT](LICENSE)
