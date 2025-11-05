import { Items } from "../../../domain/entities/items.entity";
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

  static fromEntity(item: Items): ItemsDto {
    return new ItemsDto(ProductOfItemDto.fromEntity(item.getProduct()), item.getQuantity());
  }
}