import { describe, expect, test } from "bun:test";
import { OrderEntity } from "./order.entity";

describe("OrderEntity", () => {
  test("adding an item updates the total", () => {
    // Arrange
    const order = new OrderEntity();

    // Act
    order.addItem({
      name: "Pizza",
      price: 10,
      quantity: 2,
    });

    // Assert
    expect(order.total).toBe(20);
  });
});
