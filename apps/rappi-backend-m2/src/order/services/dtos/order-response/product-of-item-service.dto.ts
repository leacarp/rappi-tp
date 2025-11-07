import { ProductOfItem } from '../../../domain/entities/product-of-item.entity';

export class ProductOfItemService {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _price: number;

  constructor(
    id: string,
    name: string,
    price: number,
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getPrice(): number {
    return this._price;
  }

  static fromEntity(product: ProductOfItem): ProductOfItemService {
    return new ProductOfItemService(
      product.getId().toString(),
      product.getName(),
      product.getPrice()
    );
  }
}