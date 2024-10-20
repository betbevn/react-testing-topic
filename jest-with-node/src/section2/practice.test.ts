import { ShoppingList } from "./practice";

let instanceShopping: ShoppingList;
beforeAll(() => {
  instanceShopping = new ShoppingList();
});

describe("Shopping List", () => {
  //   test.each`
  //     item
  //     ${"cucumber"}
  //     ${"apple"}
  //     ${"milk"}
  //     ${"coffee"}
  //   `("can add an item to the list", ({ item }) => {
  //     instanceShopping.addItem(item);

  //     console.log(instanceShopping.list.length, "instanceShopping.list.length");

  //     expect(instanceShopping.list.length).toBeGreaterThan(0);
  //   });

  test("can add an item to the list", () => {
    instanceShopping.addItem("cucumber");
    instanceShopping.addItem("apple");
    instanceShopping.addItem("milk");
    instanceShopping.addItem("coffee");
    expect(instanceShopping.list.length).toBeGreaterThan(0);
  });

  test("can remove an item from the list", () => {
    instanceShopping.removeItem("coffee");

    expect(instanceShopping.list).not.toEqual(
      expect.arrayContaining([expect.stringContaining("coffee")])
    );
  });

  test("throws an error when attempting to remove a non-existent item", () => {
    expect(() => instanceShopping.removeItem("coffee")).toThrow(
      "Item: coffee does not exist"
    );
  });
});
