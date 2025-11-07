import { User } from '../../domain/entities/user.entity';

export class GetVendorProfile {
  private readonly _restaurantName: string;
  private readonly _description: string;
  private readonly _schedule: string;
  private readonly _rating: number;
  private readonly _isAvailable: boolean;
  private readonly _phone?: string;
  private readonly _email: string;

  constructor(
    restaurantName: string,
    description: string,
    schedule: string,
    rating: number,
    isAvailable: boolean,
    email: string,
    phone?: string
  ) {
    this._restaurantName = restaurantName;
    this._description = description;
    this._schedule = schedule;
    this._rating = rating;
    this._isAvailable = isAvailable;
    this._email = email;
    this._phone = phone;
  }

  getRestaurantName(): string {
    return this._restaurantName;
  }

  getDescription(): string {
    return this._description;
  }

  getSchedule(): string {
    return this._schedule;
  }

  getRating(): number {
    return this._rating;
  }

  getIsAvailable(): boolean {
    return this._isAvailable;
  }

  getPhone(): string | undefined {
    return this._phone;
  }

  getEmail(): string {
    return this._email;
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