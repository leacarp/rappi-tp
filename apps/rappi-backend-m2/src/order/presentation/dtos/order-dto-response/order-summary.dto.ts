import { OrderEntity } from "../../../domain/entities/order.entity";
import { Types } from "mongoose";

export class OrderSummaryDto {
 constructor(
  private readonly _id: string,
  private readonly _status: string,
  private readonly _createdAt : Date,
  private readonly _trackingNumber : string
 ){}

 getId() : string{
  return this._id;
 }

 getStatus() : string{
  return this._status;
 }

 getCreatedAt() : Date{
  return this._createdAt;
 }

 getTrackingNumber(): string{
  return this._trackingNumber;
 }

 static fromEntity(order: OrderEntity): OrderSummaryDto {
    return new OrderSummaryDto(
      order.getId() instanceof Types.ObjectId ? order.getId().toHexString() : order.getId().toString(),
      order.getStatus(),
      order.getCreatedAt(),
      order.getTrackingNumber(),
    );
  }

}

