export class UpdateVendorProfile {
  private readonly _restaurantName?: string;
  private readonly _schedule?: string;
  private readonly _phone?: string;

  constructor(
    restaurantName?: string,
    schedule?: string,
    phone?: string
  ){
    this._restaurantName = restaurantName;
    this._schedule = schedule;
    this._phone = phone;
  }

  getRestaurantName(): string | undefined {
    return this._restaurantName;
  }

  getSchedule(): string | undefined {
    return this._schedule;
  }

  getPhone(): string | undefined {
    return this._phone;
  }
}