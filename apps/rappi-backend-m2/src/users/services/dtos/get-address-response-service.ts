import { Address } from '../../domain/entities/address.entity';

export class GetAddressResponseService {
    private readonly _id: string;
    private readonly _street: string;
    private readonly _city: string;
    private readonly _zipCode: string;
    private readonly _isFavorite: boolean;
  
    constructor(
      id: string,
      street: string,
      city: string,
      zipCode: string,
      isFavorite: boolean
    ) {
      this._id = id;
      this._street = street;
      this._city = city;
      this._zipCode = zipCode;
      this._isFavorite = isFavorite;
    }
  
    getId(): string {
      return this._id;
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

    static fromEntity(address: Address): GetAddressResponseService {
      return new GetAddressResponseService(
        address.getId(),
        address.getStreet(),
        address.getCity(),
        address.getZipCode(),
        address.getIsFavorite()
      );
    }
  }  