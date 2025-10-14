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


}

