import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { OrderEntity } from "../domain/order.entity";
import { OrderRepository } from "../domain/order.repository.interface";
import { Result } from "../domain/result";
import { events } from "./db/schema/events";
import { eq } from "drizzle-orm";
import { OrderEvent, orderEventFromType } from "../domain/events/order.events";

export class OrderDrizzleRepository implements OrderRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async save(order: OrderEntity): Promise<void> {
    const streamId = `Order-${order.id}`;
    const eventsToSave = order.stream().map((event) => ({
      streamId,
      data: event,
    }));
    await this.db.insert(events).values(eventsToSave);
  }

  async orderById(id: string): Promise<Result<OrderEntity, Error>> {
    const orderStream = await this.db.select().from(events).where(eq(events.streamId, `Order-${id}`));

    if (orderStream.length === 0) {
      return Result.fail(new Error(`Order with id ${id} not found`));
    }

    const order = new OrderEntity(id);
    orderStream.forEach((event) => order.when(orderEventFromType((event.data as OrderEvent).type, event.data as OrderEvent)));
    return Result.ok(order);
  }

}