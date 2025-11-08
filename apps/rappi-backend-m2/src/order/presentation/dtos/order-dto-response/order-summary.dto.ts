import { OrderSummaryService } from "../../../services/dtos/order-response/order-summary-service.dto";

export class OrderSummaryDto {
  private readonly id: string;
  private readonly status: string;
  private readonly createdAt: Date;
  private readonly trackingNumber: string;
  private readonly total: number;

  constructor(
    id: string,
    status: string,
    createdAt: Date,
    trackingNumber: string,
    total: number
  ){
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.trackingNumber = trackingNumber;
    this.total = total;
  }

  getId(): string {
    return this.id;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getTrackingNumber(): string {
    return this.trackingNumber;
  }

  getTotal(): number {
    return this.total;
  }

  static fromServiceDto(serviceDto: OrderSummaryService): OrderSummaryDto {
    return new OrderSummaryDto(
      serviceDto.getId(),
      serviceDto.getStatus(),
      serviceDto.getCreatedAt(),
      serviceDto.getTrackingNumber(),
      serviceDto.getTotal()
    );
  }
}