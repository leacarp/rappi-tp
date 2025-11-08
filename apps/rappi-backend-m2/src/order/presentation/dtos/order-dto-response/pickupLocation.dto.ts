import { PickupLocationService } from "../../../services/dtos/order-response/pickup-location-service.dto";

export class PickupLocationDto {
  private readonly latitude: number;
  private readonly longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  static fromServiceDto(serviceDto: PickupLocationService): PickupLocationDto {
    return new PickupLocationDto(serviceDto.getLatitude(), serviceDto.getLongitude());
  }
}