import { Entity } from "./entity";
import { Event } from "./event.interface";

export type Item = {
  name: string;
  price: number;
  quantity: number;
}

export class ItemAdded implements Event {
  constructor(
    public readonly item: Item,
    public readonly newTotal: number,
    public readonly orderId: string,
    public readonly occurredOn: Date,
  ) { }
}

export class OrderEntity extends Entity {
  public readonly items: Item[] = [];
  public readonly total: number = 0;

  public when(event: Event): void {
    if (event instanceof ItemAdded) {
      Object.assign(this, {
        total: event.newTotal,
      })
      this.items.push(event.item)
    }
  }

  public addItem(item: Item): void {
    const event = new ItemAdded(
      item,
      this.total + (item.price * item.quantity),
      this.id,
      new Date(),
    )

    this.apply(event)
  }

  public addItems(items: Item[]): void {
    items.forEach(item => this.addItem(item))
  }
}