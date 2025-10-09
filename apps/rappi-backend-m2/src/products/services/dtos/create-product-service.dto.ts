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

  get vendorId(): string {
    return this._vendorId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get imageURL(): string {
    return this._imageURL;
  }

  get price(): number {
    return this._price;
  }

  get category(): string {
    return this._category;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get promotions(): { isOnPromotion: boolean; discountedPrice: number } {
    return { ...this._promotions };
  }
}
