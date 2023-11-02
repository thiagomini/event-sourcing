import { describe, expect, test } from "bun:test";
import { randomUUID } from "crypto";
import {
  ItemAdded,
  ItemRemoved,
  OrderCreated,
} from "../domain/events/order.events";
import { OrderMemoryRepository } from "./order-memory.repository";
import { OrderEntity } from "../domain/order.entity";

describe("OrderMemoryRepository", () => {
  test("finds an order by id", async () => {
    // Arrange
    const orderId = randomUUID();
    const orderStream = [new OrderCreated(orderId, new Date())];
    const orderMemoryRepository = new OrderMemoryRepository(orderStream);

    // Act
    const result = await orderMemoryRepository.orderById(orderId);

    // Assert
    expect(result).toBeTruthy();
    expect(result.isOk()).toBeTrue();
    const order = result.getValue<OrderEntity>();
    expect(order.id).toEqual(orderId);
    expect(order.total).toEqual(0);
    expect(order.items).toEqual([]);
  });

  test("finds an order with a stream of events", async () => {
    // Arrange
    const orderId = randomUUID();
    const orderStream = [
      new OrderCreated(orderId, new Date()),
      new ItemAdded(
        {
          name: "Pizza",
          price: 10,
          quantity: 2,
        },
        20,
        orderId,
        new Date()
      ),
      new ItemAdded(
        {
          name: "Coke",
          price: 5,
          quantity: 1,
        },
        25,
        orderId,
        new Date()
      ),
      new ItemRemoved(
        {
          name: "Pizza",
          price: 10,
          quantity: 2,
        },
        5,
        orderId,
        new Date()
      ),
    ];
    const orderMemoryRepository = new OrderMemoryRepository(orderStream);

    // Act
    const result = await orderMemoryRepository.orderById(orderId);

    // Assert
    expect(result).toBeTruthy();
    expect(result.isOk()).toBeTrue();
    const order = result.getValue<OrderEntity>();
    expect(order.id).toEqual(orderId);
    expect(order.total).toEqual(5);
    expect(order.items).toEqual([
      {
        name: "Coke",
        price: 5,
        quantity: 1,
      },
    ]);
  });
});
