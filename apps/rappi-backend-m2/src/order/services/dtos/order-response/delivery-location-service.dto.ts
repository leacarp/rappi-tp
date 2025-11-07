import { DeliveryLocation } from "../../../domain/entities/deliveryLocation.entity";

export class DeliveryLocationService {
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

  static fromEntity(deliveryLocation: DeliveryLocation | null): DeliveryLocationService | null {
    if (!deliveryLocation) return null;
    return new DeliveryLocationService(deliveryLocation.getLatitude(), deliveryLocation.getLongitude());
  }
}