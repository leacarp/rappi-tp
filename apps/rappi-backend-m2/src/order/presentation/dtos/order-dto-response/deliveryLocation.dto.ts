import { DeliveryLocationService } from "../../../services/dtos/order-response/delivery-location-service.dto";

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

  static fromServiceDto(serviceDto: DeliveryLocationService | null): DeliveryLocationDto | null {
    if (!serviceDto) return null;
    return new DeliveryLocationDto(serviceDto.getLatitude(), serviceDto.getLongitude());
  }
}