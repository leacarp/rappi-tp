import { OrderSummaryDto } from "./order-dto-response/order-summary.dto";
import { GetOrdersResponseService } from "../../services/dtos/get-orders-response-service.dto";

export class GetUserOrdersResponseDto {
  private readonly _orders: OrderSummaryDto[];

  constructor(orders: OrderSummaryDto[]) {
    this._orders = orders;
  }

  getOrders(): OrderSummaryDto[] {
    return this._orders;
  }

  static fromServiceDto(serviceDto: GetOrdersResponseService): GetUserOrdersResponseDto {
    const orders = serviceDto.getOrders().map(order => OrderSummaryDto.fromServiceDto(order));
    return new GetUserOrdersResponseDto(orders);
  }
}