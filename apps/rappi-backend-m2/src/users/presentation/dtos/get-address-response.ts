import { GetAddressResponseService } from '../../services/dtos/get-address-response-service';

export class GetAddressResponse {
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

  static fromServiceDto(serviceDto: GetAddressResponseService): GetAddressResponse {
    return new GetAddressResponse(
      serviceDto.getId(),
      serviceDto.getStreet(),
      serviceDto.getCity(),
      serviceDto.getZipCode(),
      serviceDto.getIsFavorite()
    );
  }
}