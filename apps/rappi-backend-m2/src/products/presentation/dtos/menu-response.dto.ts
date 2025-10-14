import { PromotionResponseDto } from './product-response.dto';

export class MenuItemResponseDto {
  private readonly _name: string;
  private readonly _description: string;
  private readonly _imageURL: string;
  private readonly _price: number;
  private readonly _finalPrice: number;
  private readonly _discountPercentage: number;
  private readonly _isAvailable: boolean;
  private readonly _promotions: PromotionResponseDto;

  constructor(
    name: string,
    description: string,
    imageURL: string,
    price: number,
    finalPrice: number,
    discountPercentage: number,
    isAvailable: boolean,
    promotions: PromotionResponseDto
  ) {
    this._name = name;
    this._description = description;
    this._imageURL = imageURL;
    this._price = price;
    this._finalPrice = finalPrice;
    this._discountPercentage = discountPercentage;
    this._isAvailable = isAvailable;
    this._promotions = promotions;
  }

  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get imageURL(): string { return this._imageURL; }
  get price(): number { return this._price; }
  get finalPrice(): number { return this._finalPrice; }
  get discountPercentage(): number { return this._discountPercentage; }
  get isAvailable(): boolean { return this._isAvailable; }
  get promotions(): PromotionResponseDto { return this._promotions; }

  static fromEntity(product: any): MenuItemResponseDto {
    const promotions = product.promotions;
    const promotionData = promotions?._doc || promotions || { isOnPromotion: false, discountedPrice: 0 };

    return new MenuItemResponseDto(
      product.name,
      product.description,
      product.imageURL,
      product.price,
      product.getFinalPrice(),
      product.getDiscountPercentage(),
      product.isAvailable,
      new PromotionResponseDto(promotionData.isOnPromotion, promotionData.discountedPrice)
    );
  }

  toJSON() {
    return {
      name: this._name,
      description: this._description,
      imageURL: this._imageURL,
      price: this._price,
      finalPrice: this._finalPrice,
      discountPercentage: this._discountPercentage,
      isAvailable: this._isAvailable,
      promotions: {
        isOnPromotion: this._promotions.isOnPromotion,
        discountedPrice: this._promotions.discountedPrice,
      },
    };
  }
}

export class MenuCategoryResponseDto {
  private readonly _categoryName: string;
  private readonly _items: MenuItemResponseDto[];

  constructor(categoryName: string, items: MenuItemResponseDto[]) {
    this._categoryName = categoryName;
    this._items = items;
  }

  get categoryName(): string { return this._categoryName; }
  get items(): MenuItemResponseDto[] { return this._items; }
  get count(): number { return this._items.length; }

  toJSON() {
    return {
      categoryName: this._categoryName,
      items: this._items.map(i => i.toJSON()),
      count: this.count,
    };
  }
}

export class MenuResponseDto {
  private readonly _vendorId: string;
  private readonly _categories: MenuCategoryResponseDto[];
  private readonly _totalItems: number;

  constructor(vendorId: string, categories: MenuCategoryResponseDto[], totalItems: number) {
    this._vendorId = vendorId;
    this._categories = categories;
    this._totalItems = totalItems;
  }

  get vendorId(): string { return this._vendorId; }
  get categories(): MenuCategoryResponseDto[] { return this._categories; }
  get totalItems(): number { return this._totalItems; }

  static fromEntities(products: any[], vendorId?: string): MenuResponseDto {
    const resolvedVendorId = vendorId ?? products[0]?.vendorId?.toString() ?? '';
    const grouped = new Map<string, MenuItemResponseDto[]>();

    for (const product of products) {
      const item = MenuItemResponseDto.fromEntity(product);
      const key = product.category || 'Sin categoría';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(item);
    }

    const categories = Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([categoryName, items]) => new MenuCategoryResponseDto(categoryName, items));

    return new MenuResponseDto(resolvedVendorId, categories, products.length);
  }

  toJSON() {
    return {
      vendorId: this._vendorId,
      categories: this._categories.map(c => c.toJSON()),
      totalItems: this._totalItems,
    };
  }
}