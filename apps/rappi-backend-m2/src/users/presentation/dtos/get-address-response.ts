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
}