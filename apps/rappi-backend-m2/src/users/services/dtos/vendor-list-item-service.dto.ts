export class VendorListItemService {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _name: string;
  private readonly _phone: string;
  private readonly _restaurantName?: string;
  private readonly _description?: string;
  private readonly _schedule?: string;
  private readonly _rating?: number;
  private readonly _isAvailable?: boolean;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    phone: string,
    createdAt: Date,
    restaurantName?: string,
    description?: string,
    schedule?: string,
    rating?: number,
    isAvailable?: boolean
  ) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._phone = phone;
    this._createdAt = createdAt;
    this._restaurantName = restaurantName;
    this._description = description;
    this._schedule = schedule;
    this._rating = rating;
    this._isAvailable = isAvailable;
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getName(): string {
    return this._name;
  }

  getPhone(): string {
    return this._phone;
  }

  getRestaurantName(): string | undefined {
    return this._restaurantName;
  }

  getDescription(): string | undefined {
    return this._description;
  }

  getSchedule(): string | undefined {
    return this._schedule;
  }

  getRating(): number | undefined {
    return this._rating;
  }

  getIsAvailable(): boolean | undefined {
    return this._isAvailable;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }
}