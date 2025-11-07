import { Address } from '../../domain/entities/address.entity';

export class GetAddressesResponseService {
    private readonly _addresses: AddressItemService[];
  
    constructor(addresses: AddressItemService[]) {
      this._addresses = addresses;
    }

    getAddresses(): AddressItemService[] {
      return this._addresses;
    }

    static fromEntities(addresses: Address[]): GetAddressesResponseService {
      const addressItems = addresses.map(address => 
        AddressItemService.fromEntity(address)
      );
      return new GetAddressesResponseService(addressItems);
    }
  }

export class AddressItemService {
    private readonly id: string;
    private readonly street: string;
    private readonly city: string;
    private readonly zipCode: string;
    private readonly isFavorite: boolean;
  
    constructor(
      id: string,
      street: string,
      city: string,
      zipCode: string,
      isFavorite: boolean
    ) {
      this.id = id;
      this.street = street;
      this.city = city;
      this.zipCode = zipCode;
      this.isFavorite = isFavorite;
    }
  
    getId(): string {
      return this.id;
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

    static fromEntity(address: Address): AddressItemService {
      return new AddressItemService(
        address.getId(),
        address.getStreet(),
        address.getCity(),
        address.getZipCode(),
        address.getIsFavorite()
      );
    }
  }
  