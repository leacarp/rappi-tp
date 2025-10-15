import { OrderSummaryDto } from "./order-dto-response/order-summary.dto";

export class GetUserOrdersResponseDto {
  private readonly _orders: OrderSummaryDto[];

  constructor(orders: OrderSummaryDto[]) {
    this._orders = orders;
  }

  get orders(): OrderSummaryDto[] {
    return this._orders;
  }

  static fromEntities(orderEntities: any[]): GetUserOrdersResponseDto {
    const orders = orderEntities.map(order => OrderSummaryDto.fromEntity(order));
    return new GetUserOrdersResponseDto(orders);
  }
}
