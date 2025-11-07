import { OrderSummaryService } from "../../../services/dtos/order-response/order-summary-service.dto";

export class OrderSummaryDto {
  private readonly _id: string;
  private readonly _status: string;
  private readonly _createdAt: Date;
  private readonly _trackingNumber: string;
  private readonly _total: number;

  constructor(
    id: string,
    status: string,
    createdAt: Date,
    trackingNumber: string,
    total: number
  ){
    this._id = id;
    this._status = status;
    this._createdAt = createdAt;
    this._trackingNumber = trackingNumber;
    this._total = total;
  }

  getId(): string {
    return this._id;
  }

  getStatus(): string {
    return this._status;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getTrackingNumber(): string {
    return this._trackingNumber;
  }

  getTotal(): number {
    return this._total;
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