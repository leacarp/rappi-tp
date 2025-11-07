import { Address } from '../../domain/entities/address.entity';

export class CreateAddressRequestService {
  private readonly _street: string;
  private readonly _city: string;
  private readonly _zipCode: string;
  private readonly _isFavorite: boolean;

  constructor(
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this._street = street;
    this._city = city;
    this._zipCode = zipCode;
    this._isFavorite = isFavorite;
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

  toEntity(id: string): Address {
    return new Address(
      id,
      this._street,
      this._city,
      this._zipCode,
      this._isFavorite
    );
  }
}