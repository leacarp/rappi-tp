import { GetVendorProfile } from '../../services/dtos/get-vendor-profile-service';

export class GetVendorProfileResponse {
  private readonly restaurantName: string;
  private readonly description: string;
  private readonly schedule: string;
  private readonly rating: number;
  private readonly isAvailable: boolean;
  private readonly email: string;
  private readonly phone?: string;

  constructor(
    restaurantName: string,
    description: string,
    schedule: string,
    rating: number,
    isAvailable: boolean,
    email: string,
    phone?: string
  ) {
    this.restaurantName = restaurantName;
    this.description = description;
    this.schedule = schedule;
    this.rating = rating;
    this.isAvailable = isAvailable;
    this.email = email;
    this.phone = phone;
  }

  getRestaurantName(): string {
    return this.restaurantName;
  }

  getDescription(): string {
    return this.description;
  }

  getSchedule(): string {
    return this.schedule;
  }

  getRating(): number {
    return this.rating;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string | undefined {
    return this.phone;
  }

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