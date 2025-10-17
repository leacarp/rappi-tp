import { GetVendorProfile } from '../../services/dtos/get-vendor-profile-service';

export class GetVendorProfileResponse {
  constructor(
    public restaurantName: string,
    public description: string,
    public schedule: string,
    public rating: number,
    public isAvailable: boolean,
    public email: string,
    public phone?: string
  ) {}

  static fromServiceDto(serviceDto: GetVendorProfile): GetVendorProfileResponse {
    return new GetVendorProfileResponse(
      serviceDto.getRestaurantName(),
      serviceDto.getDescription(),
      serviceDto.getSchedule(),
      serviceDto.getRating(),
      serviceDto.getIsAvailable(),
      serviceDto.getEmail(),
      serviceDto.getPhone()
    );
  }
}