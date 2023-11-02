import { OrderEntity } from "./order.entity";

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  orderById(id: string): Promise<OrderEntity>;
}
