import { OrderEntity } from "./order.entity";
import { Result } from "./result";

export interface OrderRepository {
  save(order: OrderEntity): Promise<void>;
  orderById(id: string): Promise<Result<OrderEntity>>;
}
