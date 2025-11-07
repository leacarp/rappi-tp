import { Address } from '../../domain/entities/address.entity';

export class UpdateAddressRequestService {
  private readonly _addressId: string;
  private readonly _street: string;
  private readonly _city: string;
  private readonly _zipCode: string;
  private readonly _isFavorite: boolean;

  constructor(
    addressId: string,
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this._addressId = addressId;
    this._street = street;
    this._city = city;
    this._zipCode = zipCode;
    this._isFavorite = isFavorite;
  }

  getId(): string {
    return this._addressId;
  }

  getStreet(): string {
    return this._street;
  }

  getCity(): string {
    return this._city;
  }

  getZipCode(): string {
    return this._zipCode;
  }

  getIsFavorite(): boolean {
    return this._isFavorite;
  }

  toEntity(): Address {
    return new Address(
      this._addressId,
      this._street,
      this._city,
      this._zipCode,
      this._isFavorite
    );
  }
}