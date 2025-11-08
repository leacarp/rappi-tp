import { ProductOfItemService } from '../../../services/dtos/order-response/product-of-item-service.dto';

export class ProductOfItemDto {
  private readonly id: string;
  private readonly name: string;
  private readonly price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  static fromServiceDto(serviceDto: ProductOfItemService): ProductOfItemDto {
    return new ProductOfItemDto(
      serviceDto.getId(),
      serviceDto.getName(),
      serviceDto.getPrice()
    );
  }
}