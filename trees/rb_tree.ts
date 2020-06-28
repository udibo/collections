import { compare, direction, map } from "../common.ts";
import { ascend } from "../comparators.ts";
import { BSTree } from "./bs_tree.ts";
import { RBNode, NodeConstructor } from "./rb_node.ts";

/**
 * A red-black tree. The values are in ascending order by default,
 * using JavaScript's built in comparison operators to sort the values.
 */
export class RBTree<T> extends BSTree<T> {
  root!: RBNode<T> | null;

  constructor(compare: compare<Partial<T>> = ascend) {
    super(compare);
  }

  /** Creates a new red-black tree from an array like or iterable object. */
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
  ): RBTree<U>;
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
    },
  ): RBTree<U>;
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options: {
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
      map: map<T, U>;
      thisArg?: any;
    },
  ): RBTree<U>;
  static from<T, U>(
    collection: ArrayLike<T> | Iterable<T>,
    options?: {
      Node?: NodeConstructor<U>;
      compare?: compare<Partial<U>>;
      map?: map<T, U>;
      thisArg?: any;
    },
  ): RBTree<U> {
    return BSTree.from(
      collection,
      { Tree: RBTree, Node: RBNode, ...options },
    ) as RBTree<U>;
  }

  protected replaceNode(destination: RBNode<T>, source: RBNode<T>): void {
    super.replaceNode(destination, source);
    destination.red = source.red;
  }

  private removeFixup(parent: RBNode<T> | null, current: RBNode<T> | null) {
    while (parent && !current?.red) {
      const direction: direction = parent.left === current ? "left" : "right";
      const siblingDirection: direction = direction === "right"
        ? "left"
        : "right";
      let sibling: RBNode<T> | null = parent[siblingDirection];

      if (sibling?.red) {
        sibling.red = false;
        parent.red = true;
        this.rotateNode(parent, direction);
        sibling = parent[siblingDirection];
      }
      if (sibling) {
        if (!sibling.left?.red && !sibling.right?.red) {
          sibling!.red = true;
          current = parent;
          parent = current.parent;
        } else {
          if (!sibling[siblingDirection]?.red) {
            sibling[direction]!.red = false;
            sibling.red = true;
            this.rotateNode(sibling, siblingDirection);
            sibling = parent[siblingDirection!];
          }
          sibling!.red = parent.red;
          parent.red = false;
          sibling![siblingDirection]!.red = false;
          this.rotateNode(parent, direction);
          current = this.root;
          parent = null;
        }
      }
    }
    if (current) current.red = false;
  }

  /**
   * Adds the value to the binary search tree if it does not already exist in it.
   * Returns true if successful.
   */
  insert(value: T): boolean {
    let node = this.insertNode(RBNode, value) as (RBNode<T> | null);
    if (node) {
      while (node.parent?.red) {
        let parent: RBNode<T> = node.parent!;
        const parentDirection: direction = parent === parent.parent!.left
          ? "left"
          : "right";
        const uncleDirection: direction = parentDirection === "right"
          ? "left"
          : "right";
        const uncle: RBNode<T> | null = parent.parent![uncleDirection] ?? null;

        if (uncle?.red) {
          parent.red = false;
          uncle.red = false;
          parent.parent!.red = true;
          node = parent.parent!;
        } else {
          if (node === parent[uncleDirection]) {
            node = parent;
            this.rotateNode(node, parentDirection);
            parent = node.parent!;
          }
          parent.red = false;
          parent.parent!.red = true;
          this.rotateNode(parent.parent!, uncleDirection);
        }
      }
      this.root!.red = false;
    }
    return !!node;
  }

  /**
   * Removes node value from the binary search tree if found.
   * Returns true if found and removed.
   */
  remove(value: T): boolean {
    let node = this.removeNode(RBNode, value) as (RBNode<T> | null);
    if (node && !node.red) {
      this.removeFixup(node.parent, node.right || node.left);
    }
    return !!node;
  }

  // remove this, use nlrValues to verify self-balancing works
  *nlrRedValues(): IterableIterator<[T, boolean]> {
    const nodes: RBNode<T>[] = [];
    if (this.root) nodes.push(this.root);
    while (nodes.length) {
      const node: RBNode<T> = nodes.pop()!;
      yield [node.value, node.red];
      if (node.right) nodes.push(node.right);
      if (node.left) nodes.push(node.left);
    }
  }
}
