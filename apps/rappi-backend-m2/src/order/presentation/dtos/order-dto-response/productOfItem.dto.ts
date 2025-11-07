import { ProductOfItemService } from '../../../services/dtos/order-response/product-of-item-service.dto';

export class ProductOfItemDto {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _price: number,
  ) {}

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getPrice(): number {
    return this._price;
  }

  static fromServiceDto(serviceDto: ProductOfItemService): ProductOfItemDto {
    return new ProductOfItemDto(
      serviceDto.getId(),
      serviceDto.getName(),
      serviceDto.getPrice()
    );
  }
}