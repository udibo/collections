import { assertEquals, assertStrictEquals } from "../test_deps.ts";
import { BSNode } from "./bs_node.ts";

Deno.test("BSNode", async (t) => {
  let parent: BSNode<number>;
  let child: BSNode<number>;
  function beforeEach() {
    parent = new BSNode(null, 5);
    child = new BSNode(parent, 7);
    parent.right = child;
  }

  await t.step("context", () => {
    beforeEach();
    assertStrictEquals(parent.parent, null);
    assertStrictEquals(parent.left, null);
    assertStrictEquals(parent.right, child);
    assertStrictEquals(parent.value, 5);

    assertStrictEquals(child.parent, parent);
    assertStrictEquals(child.left, null);
    assertStrictEquals(child.right, null);
    assertStrictEquals(child.value, 7);
  });

  await t.step("from", () => {
    beforeEach();
    const parentClone: BSNode<number> = BSNode.from(parent);
    const childClone: BSNode<number> = BSNode.from(child);

    assertStrictEquals(parentClone.parent, null);
    assertStrictEquals(parentClone.left, null);
    assertStrictEquals(parentClone.right, child);
    assertStrictEquals(parentClone.value, 5);

    assertStrictEquals(childClone.parent, parent);
    assertStrictEquals(childClone.left, null);
    assertStrictEquals(childClone.right, null);
    assertStrictEquals(childClone.value, 7);
  });

  await t.step("directionFromParent", () => {
    beforeEach();
    const child2 = new BSNode(parent, 3);
    assertEquals(child2.directionFromParent(), null);
    parent.left = child2;
    assertEquals(child2.directionFromParent(), "left");
    assertEquals(parent.directionFromParent(), null);
    assertEquals(child.directionFromParent(), "right");
  });

  await t.step("findMinNode", () => {
    beforeEach();
    assertStrictEquals(parent.findMinNode(), parent);
    const child2 = new BSNode(parent, 3);
    parent.left = child2;
    assertStrictEquals(parent.findMinNode(), child2);
    const child3 = new BSNode(child2, 4);
    child2.right = child3;
    assertStrictEquals(parent.findMinNode(), child2);
    const child4 = new BSNode(child2, 2);
    child2.left = child4;
    assertStrictEquals(parent.findMinNode(), child4);
  });

  await t.step("findMaxNode", () => {
    beforeEach();
    assertStrictEquals(parent.findMaxNode(), child);
    const child2 = new BSNode(child, 6);
    child.left = child2;
    assertStrictEquals(parent.findMaxNode(), child);
    const child3 = new BSNode(child2, 6.5);
    child2.right = child3;
    assertStrictEquals(parent.findMaxNode(), child);
    const child4 = new BSNode(child2, 8);
    child.right = child4;
    assertStrictEquals(parent.findMaxNode(), child4);
    parent.right = null;
    assertStrictEquals(parent.findMaxNode(), parent);
  });

  await t.step("findSuccessorNode", () => {
    beforeEach();
    assertStrictEquals(parent.findSuccessorNode(), child);
    assertStrictEquals(child.findSuccessorNode(), null);
    const child2 = new BSNode(child, 6);
    child.left = child2;
    assertStrictEquals(parent.findSuccessorNode(), child2);
    assertStrictEquals(child.findSuccessorNode(), null);
  });
});
