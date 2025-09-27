import { OrderSummaryDto } from "./order/order-summary.dto";

export class GetUserOrdersResponseDto {
  orders: OrderSummaryDto[];
}