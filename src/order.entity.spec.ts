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

  test("adding an item updates the item list", () => {
    // Arrange
    const order = new OrderEntity();

    // Act
    order.addItem({
      name: "Pizza",
      price: 10,
      quantity: 2,
    });

    // Assert
    expect(order.items).toEqual([
      {
        name: "Pizza",
        price: 10,
        quantity: 2,
      },
    ]);
  });

  test("adding multiple items updates the total", () => {
    // Arrange
    const order = new OrderEntity();

    // Act
    order.addItems([
      {
        name: "Pizza",
        price: 10,
        quantity: 2,
      },
      {
        name: "Coke",
        price: 5,
        quantity: 1,
      },
    ]);

    // Assert
    expect(order.total).toBe(25);
  });

  test("removing an item updates the total", () => {
    // Arrange
    const order = new OrderEntity();
    order.addItems([
      {
        name: "Pizza",
        price: 10,
        quantity: 2,
      },
      {
        name: "Coke",
        price: 5,
        quantity: 1,
      },
    ]);

    // Act
    order.removeItem("Pizza");

    // Assert
    expect(order.total).toBe(5);
  });

  test("removing an item updates the item list", () => {
    // Arrange
    const order = new OrderEntity();
    order.addItems([
      {
        name: "Pizza",
        price: 10,
        quantity: 2,
      },
      {
        name: "Coke",
        price: 5,
        quantity: 1,
      },
    ]);

    // Act
    order.removeItem("Pizza");

    // Assert
    expect(order.items).toEqual([
      {
        name: "Coke",
        price: 5,
        quantity: 1,
      },
    ])
  });
});
