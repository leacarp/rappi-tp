import { Address } from '../../domain/entities/address.entity';

export class UpdateAddressRequestService {
  private readonly addressId: string;
  private readonly street: string;
  private readonly city: string;
  private readonly zipCode: string;
  private readonly isFavorite: boolean;

  constructor(
    addressId: string,
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this.addressId = addressId;
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.isFavorite = isFavorite;
  }

  getId(): string {
    return this.addressId;
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

  toEntity(): Address {
    return new Address(
      this.addressId,
      this.street,
      this.city,
      this.zipCode,
      this.isFavorite
    );
  }
}
