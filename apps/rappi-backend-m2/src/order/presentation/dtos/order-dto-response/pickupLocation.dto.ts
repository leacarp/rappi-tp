import { PickupLocationService } from "../../../services/dtos/order-response/pickup-location-service.dto";

export class PickupLocationDto {
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

  static fromServiceDto(serviceDto: PickupLocationService): PickupLocationDto {
    return new PickupLocationDto(serviceDto.getLatitude(), serviceDto.getLongitude());
  }
}