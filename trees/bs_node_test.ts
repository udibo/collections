import { BSNode } from "./bs_node.ts";
import {
  assertEquals,
  assertStrictEquals,
} from "../deps/std/testing/asserts.ts";
import { TestSuite, test } from "../deps/udibo/test_suite/mod.ts";

interface NodeTests {
  parent: BSNode<number>;
  child: BSNode<number>;
}

const nodeTests: TestSuite<NodeTests> = new TestSuite({
  name: "BSNode",
  beforeEach: (context) => {
    context.parent = new BSNode(null, 5);
    context.child = new BSNode(context.parent, 7);
    context.parent.right = context.child;
  },
});

test(nodeTests, "context", (context: NodeTests) => {
  assertStrictEquals(context.parent.parent, null);
  assertStrictEquals(context.parent.left, null);
  assertStrictEquals(context.parent.right, context.child);
  assertStrictEquals(context.parent.value, 5);

  assertStrictEquals(context.child.parent, context.parent);
  assertStrictEquals(context.child.left, null);
  assertStrictEquals(context.child.right, null);
  assertStrictEquals(context.child.value, 7);
});

test(nodeTests, "from", (context: NodeTests) => {
  const parentClone: BSNode<number> = BSNode.from(context.parent);
  const childClone: BSNode<number> = BSNode.from(context.child);

  assertStrictEquals(parentClone.parent, null);
  assertStrictEquals(parentClone.left, null);
  assertStrictEquals(parentClone.right, context.child);
  assertStrictEquals(parentClone.value, 5);

  assertStrictEquals(childClone.parent, context.parent);
  assertStrictEquals(childClone.left, null);
  assertStrictEquals(childClone.right, null);
  assertStrictEquals(childClone.value, 7);
});

test(nodeTests, "directionFromParent", (context: NodeTests) => {
  const child = new BSNode(context.parent, 3);
  assertEquals(child.directionFromParent(), null);
  context.parent.left = child;
  assertEquals(child.directionFromParent(), "left");
  assertEquals(context.parent.directionFromParent(), null);
  assertEquals(context.child.directionFromParent(), "right");
});

test(nodeTests, "findMinNode", (context: NodeTests) => {
  assertStrictEquals(context.parent.findMinNode(), context.parent);
  const child = new BSNode(context.parent, 3);
  context.parent.left = child;
  assertStrictEquals(context.parent.findMinNode(), child);
  const child2 = new BSNode(child, 4);
  child.right = child2;
  assertStrictEquals(context.parent.findMinNode(), child);
  const child3 = new BSNode(child, 2);
  child.left = child3;
  assertStrictEquals(context.parent.findMinNode(), child3);
});

test(nodeTests, "findMaxNode", (context: NodeTests) => {
  assertStrictEquals(context.parent.findMaxNode(), context.child);
  const child = new BSNode(context.child, 6);
  context.child.left = child;
  assertStrictEquals(context.parent.findMaxNode(), context.child);
  const child2 = new BSNode(child, 6.5);
  child.right = child2;
  assertStrictEquals(context.parent.findMaxNode(), context.child);
  const child3 = new BSNode(child, 8);
  context.child.right = child3;
  assertStrictEquals(context.parent.findMaxNode(), child3);
  context.parent.right = null;
  assertStrictEquals(context.parent.findMaxNode(), context.parent);
});

test(nodeTests, "findSuccessorNode", (context: NodeTests) => {
  assertStrictEquals(context.parent.findSuccessorNode(), context.child);
  assertStrictEquals(context.child.findSuccessorNode(), null);
  const child = new BSNode(context.child, 6);
  context.child.left = child;
  assertStrictEquals(context.parent.findSuccessorNode(), child);
  assertStrictEquals(context.child.findSuccessorNode(), null);
});
