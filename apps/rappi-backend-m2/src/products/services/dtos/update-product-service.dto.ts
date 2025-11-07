export class UpdateProductServiceDto {
  private readonly _name?: string;
  private readonly _description?: string;
  private readonly _imageURL?: string;
  private readonly _price?: number;
  private readonly _category?: string;
  private readonly _isAvailable?: boolean;
  private readonly _promotions?: {
    isOnPromotion: boolean;
    discountedPrice: number;
  };

  constructor(data: {
    name?: string;
    description?: string;
    imageURL?: string;
    price?: number;
    category?: string;
    isAvailable?: boolean;
    promotions?: { isOnPromotion: boolean; discountedPrice: number };
  }) {
    this._name = data.name;
    this._description = data.description;
    this._imageURL = data.imageURL;
    this._price = data.price;
    this._category = data.category;
    this._isAvailable = data.isAvailable;
    this._promotions = data.promotions;
  }

  getName(): string | undefined {
    return this._name;
  }

  getDescription(): string | undefined {
    return this._description;
  }

  getImageURL(): string | undefined {
    return this._imageURL;
  }

  getPrice(): number | undefined {
    return this._price;
  }

  getCategory(): string | undefined {
    return this._category;
  }

  getIsAvailable(): boolean | undefined {
    return this._isAvailable;
  }

  getPromotions(): { isOnPromotion: boolean; discountedPrice: number } | undefined {
    return this._promotions ? { ...this._promotions } : undefined;
  }

  toUpdateData(): any {
    const updateData: any = {};
    
    if (this._name !== undefined) updateData.name = this._name;
    if (this._description !== undefined) updateData.description = this._description;
    if (this._imageURL !== undefined) updateData.imageURL = this._imageURL;
    if (this._price !== undefined) updateData.price = this._price;
    if (this._category !== undefined) updateData.category = this._category;
    if (this._isAvailable !== undefined) updateData.isAvailable = this._isAvailable;
    if (this._promotions !== undefined) updateData.promotions = this._promotions;

    return updateData;
  }
}
