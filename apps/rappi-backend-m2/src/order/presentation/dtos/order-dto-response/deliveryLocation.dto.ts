import { DeliveryLocationService } from "../../../services/dtos/order-response/delivery-location-service.dto";

export class DeliveryLocationDto {
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

  static fromServiceDto(serviceDto: DeliveryLocationService | null): DeliveryLocationDto | null {
    if (!serviceDto) return null;
    return new DeliveryLocationDto(serviceDto.getLatitude(), serviceDto.getLongitude());
  }
}