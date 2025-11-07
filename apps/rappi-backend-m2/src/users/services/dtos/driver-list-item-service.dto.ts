export class DriverListItemService {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _name: string;
  private readonly _phone: string;
  private readonly _vehicle?: string;
  private readonly _isAvailable?: boolean;
  private readonly _totalEarnings?: number;
  private readonly _createdAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    phone: string,
    createdAt: Date,
    vehicle?: string,
    isAvailable?: boolean,
    totalEarnings?: number
  ) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._phone = phone;
    this._createdAt = createdAt;
    this._vehicle = vehicle;
    this._isAvailable = isAvailable;
    this._totalEarnings = totalEarnings;
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

  getVehicle(): string | undefined {
    return this._vehicle;
  }

  getIsAvailable(): boolean | undefined {
    return this._isAvailable;
  }

  getTotalEarnings(): number | undefined {
    return this._totalEarnings;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }
}