export interface Node<T> {
  parent: Node<T> | null;
  left: Node<T> | null;
  right: Node<T> | null;
  value: T;
}

export interface NodeConstructor<T> {
  new (parent: Node<T> | null, value: T): Node<T>;
  from(node: Node<T>): Node<T>;
}

export class BSNode<T> implements Node<T> {
  left: Node<T> | null;
  right: Node<T> | null;
  constructor(public parent: Node<T> | null, public value: T) {
    this.left = null;
    this.right = null;
  }

  static from<T>(node: BSNode<T>): BSNode<T> {
    const copy: BSNode<T> = new BSNode(node.parent, node.value);
    copy.left = node.left;
    copy.right = node.right;
    return copy;
  }
}
