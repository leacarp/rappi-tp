export class GetAddressesResponseService {
    private readonly addresses: AddressItemService[];
  
    constructor(addresses: AddressItemService[]) {
      this.addresses = addresses;
    }

    getAddresses(): AddressItemService[] {
      return this.addresses;
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
  }
  