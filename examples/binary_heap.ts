import { ascend, BinaryHeap } from "../mod.ts";

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
