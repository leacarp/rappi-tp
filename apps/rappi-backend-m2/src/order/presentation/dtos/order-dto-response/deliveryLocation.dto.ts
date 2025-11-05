import { DeliveryLocation } from "../../../domain/entities/deliveryLocation.entity";

export class DeliveryLocationDto {
  private readonly _latitude: number;
  private readonly _longitude: number;

  constructor(latitude: number, longitude: number) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  getLatitude(): number {
    return this._latitude;
  }

  getLongitude(): number {
    return this._longitude;
  }

  static fromEntity(deliveryLocation: DeliveryLocation | null): DeliveryLocationDto | null {
    if (!deliveryLocation) return null;
    return new DeliveryLocationDto(deliveryLocation.getLatitude(), deliveryLocation.getLongitude());
  }
}