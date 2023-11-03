import { Discount } from "./discount";
import { Entity } from "./entity";
import { Event } from "./event.interface";
import { DiscountApplied, ItemAdded, ItemRemoved } from "./events/order.events";

export type Item = {
  name: string;
  price: number;
  quantity: number;
};

export class OrderEntity extends Entity {
  public readonly items: Item[] = [];
  public readonly total: number = 0;

  public when(event: Event): void {
    if (event instanceof ItemAdded) {
      this.updateTotal(event.newTotal);
      this.items.push(event.item);
    } else if (event instanceof ItemRemoved) {
      this.updateTotal(event.newTotal);
      const itemToRemove = this.items.find(
        (item) => item.name === event.item.name
      ) as Item;
      this.items.splice(this.items.indexOf(itemToRemove), 1);
    } else if (event instanceof DiscountApplied) {
      this.updateTotal(event.newTotal);
    }
  }

  private updateTotal(newTotal: number): void {
    this.assign({
      total: newTotal,
    });
  }

  public addItem(item: Item): void {
    const event = new ItemAdded(
      item,
      this.total + item.price * item.quantity,
      this.id,
      new Date()
    );

    this.apply(event);
  }

  public removeItem(itemName: string): void {
    const item = this.items.find((item) => item.name === itemName);

    if (!item) {
      return;
    }

    const event = new ItemRemoved(
      item,
      this.total - item.price * item.quantity,
      this.id,
      new Date()
    );

    this.apply(event);
  }

  public addItems(items: Item[]): void {
    items.forEach((item) => this.addItem(item));
  }

  public applyDiscount(discount: Discount): void {
    const newTotal = discount.apply(this.total);

    const event = new DiscountApplied(discount, newTotal, this.id, new Date());

    this.apply(event);
  }
}
