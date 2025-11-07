import { GetAddressesResponseService, AddressItemService } from '../../services/dtos/get-addresses-response-service';

export class GetAddressesResponse {
  private readonly addresses: AddressItem[];

  constructor(addresses: AddressItem[]) {
    this.addresses = addresses;
  }

  getAddresses(): AddressItem[] {
    return this.addresses;
  }

  static fromServiceDto(serviceDto: GetAddressesResponseService): GetAddressesResponse {
    const addresses = serviceDto.getAddresses().map(address => 
      AddressItem.fromServiceDto(address)
    );
    return new GetAddressesResponse(addresses);
  }
}

export class AddressItem {
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

  static fromServiceDto(serviceDto: AddressItemService): AddressItem {
    return new AddressItem(
      serviceDto.getId(),
      serviceDto.getStreet(),
      serviceDto.getCity(),
      serviceDto.getZipCode(),
      serviceDto.getIsFavorite()
    );
  }
}
