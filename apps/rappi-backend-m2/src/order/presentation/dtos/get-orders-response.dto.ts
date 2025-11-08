import { OrderSummaryDto } from "./order-dto-response/order-summary.dto";
import { GetOrdersResponseService } from "../../services/dtos/get-orders-response-service.dto";

export class GetUserOrdersResponseDto {
  private readonly orders: OrderSummaryDto[];

  constructor(orders: OrderSummaryDto[]) {
    this.orders = orders;
  }

  getOrders(): OrderSummaryDto[] {
    return this.orders;
  }

  static fromServiceDto(serviceDto: GetOrdersResponseService): GetUserOrdersResponseDto {
    const orders = serviceDto.getOrders().map(order => OrderSummaryDto.fromServiceDto(order));
    return new GetUserOrdersResponseDto(orders);
  }
}