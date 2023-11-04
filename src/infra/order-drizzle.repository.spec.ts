import { afterAll, afterEach, beforeAll, describe, expect, test } from 'bun:test';
import { OrderRepository } from '../domain/order.repository.interface';
import { randomUUID } from 'crypto';
import { OrderEntity } from '../domain/order.entity';
import { client, db } from './db/drizzle.client';
import { events } from './db/schema/events';
import { OrderDrizzleRepository } from './order-drizzle.repository';

describe('OrderDrizzleRepository', () => {
  beforeAll(async () => {
    await db.delete(events);
  })

  afterAll(async () => {
    await client.end();
  })

  test('finds an order by id', async () => {
    // Arrange
    const orderDrizzleRepository: OrderRepository =
      createOrderDrizzleRepository();
    const orderId = randomUUID();
    await saveOrder(orderId);
    // Act
    const result = await orderDrizzleRepository.orderById(orderId);

    // Assert
    expect(result).toBeTruthy();
    expect(result.isOk()).toBeTrue();
    const order = result.getValue<OrderEntity>();
    expect(order.id).toEqual(orderId);
    expect(order.total).toEqual(0);
    expect(order.items).toEqual([]);
  });

  test('saves a new order', async () => {
    // Arrange
    const anOrder = new OrderEntity();
    anOrder.addItem({
      name: 'Burger',
      price: 10,
      quantity: 3,
    });
    const orderMemoryRepository = createOrderDrizzleRepository();

    // Act
    await orderMemoryRepository.save(anOrder);

    // Assert
    const result = await orderMemoryRepository.orderById(anOrder.id);
    const order = result.getValue<OrderEntity>();
    expect(order.total).toBe(30);
    expect(order.id).toBe(anOrder.id);
    expect(order.items).toEqual([
      {
        name: 'Burger',
        price: 10,
        quantity: 3,
      },
    ]);
  });
});

function createOrderDrizzleRepository(): OrderRepository {
  return new OrderDrizzleRepository(db);
}

async function saveOrder(orderId: string): Promise<void> {
  await db.insert(events).values({
    data: {
      orderId,
      occurredOn: new Date(),
      type: 'OrderCreated',
    },
    streamId: `Order-${orderId}`,
  })
}
