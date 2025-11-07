import { Types } from "mongoose";

import { Product } from "../../domain/entities/product.entity";

export class CreateProductServiceDto {
  private readonly _vendorId: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _imageURL: string;
  private readonly _price: number;
  private readonly _category: string;
  private readonly _isAvailable: boolean;
  private readonly _promotions: {
    isOnPromotion: boolean;
    discountedPrice: number;
  };

  constructor(
    vendorId: string,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    category: string,
    isAvailable: boolean = true,
    promotions: { isOnPromotion: boolean; discountedPrice: number } = { isOnPromotion: false, discountedPrice: 0 }
  ) {
    this._vendorId = vendorId;
    this._name = name;
    this._description = description;
    this._imageURL = imageURL;
    this._price = price;
    this._category = category;
    this._isAvailable = isAvailable;
    this._promotions = promotions;
  }

  getVendorId(): string {
    return this._vendorId;
  }

  getName(): string {
    return this._name;
  }

  getDescription(): string {
    return this._description;
  }

  getImageURL(): string {
    return this._imageURL;
  }

  getPrice(): number {
    return this._price;
  }

  getCategory(): string {
    return this._category;
  }

  getIsAvailable(): boolean {
    return this._isAvailable;
  }

  getPromotions(): { isOnPromotion: boolean; discountedPrice: number } {
    return { ...this._promotions };
  }

  toEntity(): Product {
    return new Product(
      new Types.ObjectId(),
      new Types.ObjectId(this.getVendorId()),
      this.getName(),
      this.getDescription(),
      this.getImageURL(),
      this.getPrice(),
      this.getCategory(),
      this.getIsAvailable(),
      this.getPromotions()
    );
  }
}