/**
 * [Exercise]
 * 1. Test case to confirm that the `addItem` method can add an item to the list.
 * 2. Test case to confirm that the `removeItem` method can remove an item from the list.
 * 3. Test case to confirm that the `removeItem` method throws an error when attempting to remove a non-existent item.
 */

export class ShoppingList {
  public list: string[];

  constructor() {
    this.list = [];
  }

  addItem(item: string): void {
    this.list.push(item);
  }

  removeItem(item: string): void {
    const index = this.list.indexOf(item);
    if (index === -1) {
      throw new Error(`Item: ${item} does not exist`);
    }
    this.list.splice(index, 1);
  }
}
