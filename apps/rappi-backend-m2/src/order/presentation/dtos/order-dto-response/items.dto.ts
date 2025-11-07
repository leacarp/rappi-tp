import { ItemsServiceResponse } from "../../../services/dtos/order-response/items-service-response.dto";
import { ProductOfItemDto } from "./productOfItem.dto";

export class ItemsDto {
  private readonly _productOfItem: ProductOfItemDto;
  private readonly _quantity: number;

  constructor(productOfItem: ProductOfItemDto, quantity: number) {
    this._productOfItem = productOfItem;
    this._quantity = quantity;
  }

  getProduct(): ProductOfItemDto {
    return this._productOfItem;
  }

  getQuantity(): number {
    return this._quantity;
  }

  static fromServiceDto(serviceDto: ItemsServiceResponse): ItemsDto {
    return new ItemsDto(ProductOfItemDto.fromServiceDto(serviceDto.getProduct()), serviceDto.getQuantity());
  }
}