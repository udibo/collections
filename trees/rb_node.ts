/** This module is browser compatible. */

import { BSNode } from "./bs_node.ts";

export class RBNode<T> extends BSNode<T> {
  parent!: RBNode<T> | null;
  left!: RBNode<T> | null;
  right!: RBNode<T> | null;
  red: boolean;

  constructor(parent: RBNode<T> | null, value: T) {
    super(parent, value);
    this.red = true;
  }

  static from<T>(node: RBNode<T>): RBNode<T> {
    const copy: RBNode<T> = BSNode.from(node) as RBNode<T>;
    copy.red = node.red;
    return copy;
  }
}
