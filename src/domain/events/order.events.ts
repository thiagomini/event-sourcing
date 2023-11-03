import type { Discount } from "../discount";
import type { Event } from "./event.interface";
import type { Item } from "../order.entity";

export interface OrderEvent extends Event {
  orderId: string;
}

export class OrderCreated implements OrderEvent {
  public readonly type = "OrderCreated";
  constructor(
    public readonly orderId: string,
    public readonly occurredOn: Date
  ) {}
}

export class ItemAdded implements OrderEvent {
  public readonly type = "ItemAdded";
  constructor(
    public readonly item: Item,
    public readonly newTotal: number,
    public readonly orderId: string,
    public readonly occurredOn: Date
  ) {}
}

export class ItemRemoved implements OrderEvent {
  public readonly type = "ItemRemoved";
  constructor(
    public readonly item: Item,
    public readonly newTotal: number,
    public readonly orderId: string,
    public readonly occurredOn: Date
  ) {}
}

export class DiscountApplied implements OrderEvent {
  public readonly type = "DiscountApplied";
  constructor(
    public readonly discount: Discount,
    public readonly newTotal: number,
    public readonly orderId: string,
    public readonly occurredOn: Date
  ) {}
}
