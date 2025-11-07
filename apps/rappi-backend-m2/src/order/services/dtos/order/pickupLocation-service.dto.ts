import { PickUpLocation } from "../../../domain/entities/pickup-location.entity";

export class PickupLocationDtoService {
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

  static fromEntity(pickup: PickUpLocation): PickupLocationDtoService {
    return new PickupLocationDtoService(pickup.getLatitude(), pickup.getLongitude());
  }

  static toEntity(pickupLocationDto: PickupLocationDtoService): PickUpLocation {
    return new PickUpLocation(pickupLocationDto.getLatitude(), pickupLocationDto.getLongitude());
  }
}