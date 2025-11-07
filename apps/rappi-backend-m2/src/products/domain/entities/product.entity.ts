import { Types } from 'mongoose';

export class Product {
  private readonly _id: Types.ObjectId;
  private readonly _vendorId: Types.ObjectId;
  private _name: string;
  private _description: string;
  private _imageURL: string;
  private _price: number;
  private _category: string;
  private _isAvailable: boolean;
  private _promotions: {
    isOnPromotion: boolean;
    discountedPrice: number;
  };

  constructor(
    id: Types.ObjectId,
    vendorId: Types.ObjectId,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    category: string,
    isAvailable: boolean,
    promotions: {
      isOnPromotion: boolean,
      discountedPrice: number;
    }
  ) {
    this._id = id;
    this._vendorId = vendorId;
    this._name = name;
    this._description = description;
    this._imageURL = imageURL;
    this._price = price;
    this._category = category;
    this._isAvailable = isAvailable;
    this._promotions = promotions;
    
    this.validateBusinessRules();
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getVendorId(): Types.ObjectId {
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

  private validateBusinessRules(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('El nombre del producto es obligatorio');
    }

    if (this._price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    if (this._promotions.isOnPromotion && this._promotions.discountedPrice >= this._price) {
      throw new Error('El precio con descuento debe ser menor al precio original');
    }

    if (this._promotions.isOnPromotion && this._promotions.discountedPrice <= 0) {
      throw new Error('El precio con descuento debe ser mayor a 0');
    }
  }

  public updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    this._price = newPrice;
    
    if (this._promotions.isOnPromotion && this._promotions.discountedPrice >= newPrice) {
      this.removePromotion();
    }
  }

  public makeAvailable(): void {
    this._isAvailable = true;
  }

  public makeUnavailable(): void {
    this._isAvailable = false;
  }

  public applyPromotion(discountedPrice: number): void {
    if (discountedPrice <= 0) {
      throw new Error('El precio con descuento debe ser mayor a 0');
    }
    if (discountedPrice >= this._price) {
      throw new Error('El precio con descuento debe ser menor al precio original');
    }
    
    this._promotions.isOnPromotion = true;
    this._promotions.discountedPrice = discountedPrice;
  }

  public removePromotion(): void {
    this._promotions.isOnPromotion = false;
    this._promotions.discountedPrice = 0;
  }

  public getFinalPrice(): number {
    return this._promotions.isOnPromotion ? this._promotions.discountedPrice : this._price;
  }

  public getDiscountPercentage(): number {
    if (!this._promotions.isOnPromotion) {
      return 0;
    }
    return Math.round(((this._price - this._promotions.discountedPrice) / this._price) * 100);
  }

  public isValidForSale(): boolean {
    return this._isAvailable && this._price > 0;
  }
}
