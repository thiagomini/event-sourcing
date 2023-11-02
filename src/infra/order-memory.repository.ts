import { OrderEntity } from "../domain/order.entity";
import type { OrderRepository } from "../domain/order.repository.interface";
import { OrderEvent } from "../domain/events/order.events";
import { Result } from "../domain/result";

export class OrderMemoryRepository implements OrderRepository {
  constructor(private readonly orderStream: OrderEvent[]) {}

  save(order: OrderEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  orderById(id: string): Promise<Result<OrderEntity>> {
    const streamForOrder = this.orderStream.filter(
      (event) => event.orderId === id
    );

    if (!streamForOrder.length) {
      return Promise.resolve(Result.fail(new Error("Order not found")));
    }

    const order = new OrderEntity(id);
    streamForOrder.forEach((event) => order.when(event));
    return Promise.resolve(Result.ok(order));
  }
}
