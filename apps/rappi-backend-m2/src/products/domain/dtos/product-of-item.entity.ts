import { Types } from 'mongoose';

import { Product } from '../entities/product.entity';

export class ProductOfItem {
  private readonly _id: Types.ObjectId;
  private readonly _name: string;
  private readonly _price: number;

  constructor(id: Types.ObjectId, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getPrice(): number {
    return this._price;
  }

  static fromEntity(entity: Product): ProductOfItem {
    return new ProductOfItem(entity.getId(), entity.getName(), entity.getPrice());
  }
}