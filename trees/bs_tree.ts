import { compare, direction, map } from "../common.ts";
import { ascend } from "../comparators.ts";
import { Node, NodeConstructor, BSNode } from "./bs_node.ts";

function findMinNode<T>(node: Node<T>): Node<T> {
  let minNode: Node<T> = node;
  while (minNode.left) minNode = minNode.left;
  return minNode;
}

function findMaxNode<T>(node: Node<T>): Node<T> {
  let maxNode: Node<T> = node;
  while (maxNode.right) maxNode = maxNode.right;
  return maxNode;
}

export interface BSTreeConstructor<T> {
  new (compare?: compare<Partial<T>>): BSTree<T>;
  from<T, U>(collection: ArrayLike<T> | Iterable<T>): BSTree<U>;
  from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      Tree?: BSTree<U>;
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
    },
  ): BSTree<U>;
  from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
      map: map<T, U>;
      thisArg?: any;
    },
  ): BSTree<U>;
  from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options?: {
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
      map?: map<T, U>;
      thisArg?: any;
    },
  ): BSTree<U>;
}

/**
 * A unbalanced binary search tree. The values are in ascending order by default,
 * using JavaScript's built in comparison operators to sort the values.
 */
export class BSTree<T> implements Iterable<T> {
  protected root: Node<T> | null = null;
  protected _size: number = 0;
  constructor(protected compare: compare<Partial<T>> = ascend) {}

  /** Creates a new binary search tree from an array like or iterable object. */
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
  ): BSTree<U>;
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      Tree?: BSTreeConstructor<U>;
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
    },
  ): BSTree<U>;
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      Tree?: BSTreeConstructor<U>;
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
      map: map<T, U>;
      thisArg?: any;
    },
  ): BSTree<U>;
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options?: {
      Tree?: BSTreeConstructor<U>;
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
      map?: map<T, U>;
      thisArg?: any;
    },
  ): BSTree<U> {
    const Tree: BSTreeConstructor<U> = options?.Tree ?? BSTree;
    let result: BSTree<U>;
    let unmappedValues: ArrayLike<T> | Iterable<T> = [];
    if (collection instanceof BSTree) {
      result = new Tree(options?.compare ?? collection.compare) as BSTree<U>;
      if (options?.compare || options?.map) {
        unmappedValues = collection;
      } else {
        const nodes: Node<U>[] = [];
        const Node: NodeConstructor<U> = options?.Node ?? BSNode;
        if (collection.root) {
          result.root = Node.from(collection.root);
          nodes.push(result.root);
        }
        while (nodes.length) {
          const node: Node<U> = nodes.pop()!;
          const left: Node<U> | null = node.left ? Node.from(node.left) : null;
          const right: Node<U> | null = node.right
            ? Node.from(node.right)
            : null;

          if (node.right) {
            node.right.parent = node;
            nodes.push(node.right);
          }
          if (node.left) {
            node.left.parent = node;
            nodes.push(node.left);
          }
        }
      }
    } else {
      result = (options?.compare
        ? new Tree(options.compare)
        : new Tree()) as BSTree<U>;
      unmappedValues = collection;
    }
    const values: Iterable<U> = options?.map
      ? Array.from(unmappedValues, options.map, options.thisArg)
      : unmappedValues as U[];
    for (const value of values) result.insert(value);
    return result;
  }

  /** The amount of values stored in the binary search tree. */
  get size(): number {
    return this._size;
  }

  protected findNode(value: Partial<T>): Node<T> | null {
    let node: Node<T> | null = this.root;
    while (node) {
      const order: number = this.compare(value, node.value);
      if (order === 0) break;
      const direction: "left" | "right" = order < 0 ? "left" : "right";
      node = node[direction];
    }
    return node;
  }

  protected rotateNode(node: Node<T>, direction: direction) {
    const replacementDirection: direction = direction === "left"
      ? "right"
      : "left";
    if (!node[replacementDirection]) {
      throw new TypeError(
        `cannot rotate ${direction} without ${replacementDirection} child`,
      );
    }
    const replacement: Node<T> = node[replacementDirection]!;
    node[replacementDirection] = replacement[direction] ?? null;
    if (replacement[direction]) replacement[direction]!.parent = node;
    replacement.parent = node.parent;
    if (node.parent) {
      const parentDirection: direction = node === node.parent[direction]
        ? direction
        : replacementDirection;
      node.parent[parentDirection] = replacement;
    } else {
      this.root = replacement;
    }
    replacement[direction] = node;
    node.parent = replacement;
  }

  protected insertNode(Node: NodeConstructor<T>, value: T): Node<T> | null {
    if (!this.root) {
      this.root = new Node(null, value);
      this._size++;
      return this.root;
    } else {
      let node: Node<T> = this.root;
      while (true) {
        const order: number = this.compare(value, node.value);
        if (order === 0) break;
        const direction: "left" | "right" = order < 0 ? "left" : "right";
        if (node[direction]) {
          node = node[direction]!;
        } else {
          node[direction] = new Node(node, value);
          this._size++;
          return node[direction];
        }
      }
    }
    return null;
  }

  protected replaceNode(destination: Node<T>, source: Node<T>): void {
    destination.value = source.value;
    destination.left = source.left;
    destination.right = source.right;
    if (destination.left) destination.left.parent = destination;
    if (destination.right) destination.right.parent = destination;
  }

  protected removeNode(
    Node: NodeConstructor<T>,
    value: Partial<T>,
  ): Node<T> | null {
    let removeNode: Node<T> | null = this.findNode(value);
    if (removeNode) {
      const value: T = removeNode.value;
      let node: Node<T> | null = removeNode;
      removeNode = Node.from(removeNode);
      const minNode: Node<T> = node.right ? findMinNode(node.right) : node;
      node.value = minNode.value;
      if (minNode.right) {
        this.replaceNode(minNode, minNode.right);
      } else if (minNode.parent === node) {
        removeNode = minNode;
        removeNode.value = value;
        node.right = null;
      } else if (minNode.parent) {
        const direction: direction = minNode.parent.left === minNode
          ? "left"
          : "right";
        minNode.parent[direction] = minNode.left;
        if (minNode.left) minNode.left!.parent = minNode.parent;
        removeNode = minNode;
        removeNode.value = value;
      } else {
        this.root = minNode.left;
        if (this.root) this.root.parent = null;
        removeNode = minNode;
        removeNode.value = value;
      }
      this._size--;
    }
    return removeNode;
  }

  /**
   * Adds the value to the binary search tree if it does not already exist in it.
   * Returns true if successful.
   */
  insert(value: T): boolean {
    return !!this.insertNode(BSNode, value);
  }

  /**
   * Removes node value from the binary search tree if found.
   * Returns true if found and removed.
   */
  remove(value: Partial<T>): boolean {
    return !!this.removeNode(BSNode, value);
  }

  /** Returns node value if found in the binary search tree. */
  find(value: Partial<T>): T | null {
    return this.findNode(value)?.value ?? null;
  }

  /** Returns the minimum value in the binary search tree or null if empty. */
  min(): T | null {
    return this.root ? findMinNode(this.root).value : null;
  }

  /** Returns the maximum value in the binary search tree or null if empty. */
  max(): T | null {
    return this.root ? findMaxNode(this.root).value : null;
  }

  /** Checks if the binary search tree is empty. */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns an iterator that uses in-order (LNR) tree traversal for
   * retrieving values from the binary search tree.
   */
  *lnrValues(): IterableIterator<T> {
    const nodes: Node<T>[] = [];
    let node: Node<T> | null = this.root;
    while (nodes.length || node) {
      if (node) {
        nodes.push(node);
        node = node.left;
      } else {
        node = nodes.pop()!;
        yield node.value;
        node = node.right;
      }
    }
  }

  /**
   * Returns an iterator that uses reverse in-order (RNL) tree traversal for
   * retrieving values from the binary search tree.
   */
  *rnlValues(): IterableIterator<T> {
    const nodes: Node<T>[] = [];
    let node: Node<T> | null = this.root;
    while (nodes.length || node) {
      if (node) {
        nodes.push(node);
        node = node.right;
      } else {
        node = nodes.pop()!;
        yield node.value;
        node = node.left;
      }
    }
  }

  /**
   * Returns an iterator that uses pre-order (NLR) tree traversal for
   * retrieving values from the binary search tree.
   */
  *nlrValues(): IterableIterator<T> {
    const nodes: Node<T>[] = [];
    if (this.root) nodes.push(this.root);
    while (nodes.length) {
      const node: Node<T> = nodes.pop()!;
      yield node.value;
      if (node.right) nodes.push(node.right);
      if (node.left) nodes.push(node.left);
    }
  }

  /**
   * Returns an iterator that uses post-order (LRN) tree traversal for
   * retrieving values from the binary search tree.
   */
  *lrnValues(): IterableIterator<T> {
    const nodes: Node<T>[] = [];
    let node: Node<T> | null = this.root;
    let lastNodeVisited: Node<T> | null = null;
    while (nodes.length || node) {
      if (node) {
        nodes.push(node);
        node = node.left;
      } else {
        const lastNode: Node<T> = nodes[nodes.length - 1];
        if (lastNode.right && lastNode.right !== lastNodeVisited) {
          node = lastNode.right;
        } else {
          yield lastNode.value;
          lastNodeVisited = nodes.pop()!;
        }
      }
    }
  }

  /**
   * Returns an iterator that uses level order tree traversal for
   * retrieving values from the binary search tree.
   */
  *lvlValues(): IterableIterator<T> {
    const children: Node<T>[] = [];
    let cursor: Node<T> | null = this.root;
    while (cursor) {
      yield cursor.value;
      if (cursor.left) children.push(cursor.left);
      if (cursor.right) children.push(cursor.right);
      cursor = children.shift() ?? null;
    }
  }

  /**
   * Returns an iterator that uses in-order (LNR) tree traversal for
   * retrieving values from the binary search tree.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this.lnrValues();
  }
}
