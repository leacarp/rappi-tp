import { User } from '../../domain/entities/user.entity';

export class GetVendorProfile {
  private readonly restaurantName: string;
  private readonly description: string;
  private readonly schedule: string;
  private readonly rating: number;
  private readonly isAvailable: boolean;
  private readonly phone?: string;
  private readonly email: string;

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

  getPhone(): string | undefined {
    return this.phone;
  }

  getEmail(): string {
    return this.email;
  }

  static fromEntity(user: User): GetVendorProfile {
    const vendorInfo = user.getProfile().getVendorInfo();
    
    if (!vendorInfo) {
      throw new Error('El usuario no tiene información de vendor');
    }

    return new GetVendorProfile(
      vendorInfo.getRestaurantName(),
      vendorInfo.getDescription(),
      vendorInfo.getSchedule(),
      vendorInfo.getRating(),
      vendorInfo.getIsAvailable(),
      user.getEmail(),
      user.getProfile().getPhone()
    );
  }
}