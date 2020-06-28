import { BSNode } from "./bs_node.ts";
import { assertStrictEquals } from "../deps/std/testing/asserts.ts";

Deno.test("BSNode", () => {
  const parent: BSNode<number> = new BSNode(null, 5);
  const child: BSNode<number> = new BSNode(parent, 7);
  parent.left = child;
  const parentClone: BSNode<number> = BSNode.from(parent);
  const childClone: BSNode<number> = BSNode.from(child);

  assertStrictEquals(parent.parent, null);
  assertStrictEquals(parent.left, child);
  assertStrictEquals(parent.right, null);
  assertStrictEquals(parent.value, 5);

  assertStrictEquals(child.parent, parent);
  assertStrictEquals(child.left, null);
  assertStrictEquals(child.right, null);
  assertStrictEquals(child.value, 7);

  assertStrictEquals(parentClone.parent, null);
  assertStrictEquals(parentClone.left, child);
  assertStrictEquals(parentClone.right, null);
  assertStrictEquals(parentClone.value, 5);

  assertStrictEquals(childClone.parent, parent);
  assertStrictEquals(childClone.left, null);
  assertStrictEquals(childClone.right, null);
  assertStrictEquals(childClone.value, 7);
});
