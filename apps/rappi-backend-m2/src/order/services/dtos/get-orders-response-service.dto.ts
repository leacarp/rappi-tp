import { OrderEntity } from "../../domain/entities/order.entity";
import { OrderSummaryService } from "./order-response/order-summary-service.dto";

export class GetOrdersResponseService {
  private readonly _orders: OrderSummaryService[];

  constructor(orders: OrderSummaryService[]) {
    this._orders = orders;
  }

  getOrders(): OrderSummaryService[] {
    return this._orders;
  }

  static fromEntities(orderEntities: OrderEntity[]): GetOrdersResponseService {
    const orders = orderEntities.map(order => OrderSummaryService.fromEntity(order));
    return new GetOrdersResponseService(orders);
  }
}