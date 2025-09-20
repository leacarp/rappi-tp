import { Address } from '../../domain/entities/address.entity';

export class CreateAddressRequestService {
  private readonly street: string;
  private readonly city: string;
  private readonly zipCode: string;
  private readonly isFavorite: boolean;

  constructor(
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.isFavorite = isFavorite;
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  getIsFavorite(): boolean {
    return this.isFavorite;
  }

  toEntity(id: string): Address {
    return new Address(
      id,
      this.street,
      this.city,
      this.zipCode,
      this.isFavorite
    );
  }
}
