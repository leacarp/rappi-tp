import { ItemsServiceResponse } from "../../../services/dtos/order-response/items-service-response.dto";
import { ProductOfItemDto } from "./productOfItem.dto";

export class ItemsDto {
  private readonly productOfItem: ProductOfItemDto;
  private readonly quantity: number;

  constructor(productOfItem: ProductOfItemDto, quantity: number) {
    this.productOfItem = productOfItem;
    this.quantity = quantity;
  }

  getProduct(): ProductOfItemDto {
    return this.productOfItem;
  }

  getQuantity(): number {
    return this.quantity;
  }

  static fromServiceDto(serviceDto: ItemsServiceResponse): ItemsDto {
    return new ItemsDto(ProductOfItemDto.fromServiceDto(serviceDto.getProduct()), serviceDto.getQuantity());
  }
}