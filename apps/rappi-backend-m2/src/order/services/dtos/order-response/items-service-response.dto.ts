import { Items } from "../../../domain/entities/items.entity";
import { ProductOfItemService } from "./product-of-item-service.dto";

export class ItemsServiceResponse {
  private readonly _productOfItem: ProductOfItemService;
  private readonly _quantity: number;

  constructor(productOfItem: ProductOfItemService, quantity: number) {
    this._productOfItem = productOfItem;
    this._quantity = quantity;
  }

  getProduct(): ProductOfItemService {
    return this._productOfItem;
  }

  getQuantity(): number {
    return this._quantity;
  }

  static fromEntity(item: Items): ItemsServiceResponse {
    return new ItemsServiceResponse(ProductOfItemService.fromEntity(item.getProduct()), item.getQuantity());
  }
}