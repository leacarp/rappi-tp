import { Product } from '../../domain/entities/product.entity';
import { PromotionResponseService } from './product-response-service.dto';

export class MenuItemResponseService {
  private readonly _name: string;
  private readonly _description: string;
  private readonly _imageURL: string;
  private readonly _price: number;
  private readonly _finalPrice: number;
  private readonly _discountPercentage: number;
  private readonly _isAvailable: boolean;
  private readonly _promotions: PromotionResponseService;

  constructor(
    name: string,
    description: string,
    imageURL: string,
    price: number,
    finalPrice: number,
    discountPercentage: number,
    isAvailable: boolean,
    promotions: PromotionResponseService
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

  getFinalPrice(): number {
    return this._finalPrice;
  }

  getDiscountPercentage(): number {
    return this._discountPercentage;
  }

  getIsAvailable(): boolean {
    return this._isAvailable;
  }

  getPromotions(): PromotionResponseService {
    return this._promotions;
  }

  static fromEntity(product: Product): MenuItemResponseService {
    const promotions = product.getPromotions();
    
    return new MenuItemResponseService(
      product.getName(),
      product.getDescription(),
      product.getImageURL(),
      product.getPrice(),
      product.getFinalPrice(),
      product.getDiscountPercentage(),
      product.getIsAvailable(),
      new PromotionResponseService(promotions.isOnPromotion, promotions.discountedPrice)
    );
  }
}

export class MenuCategoryResponseService {
  private readonly _categoryName: string;
  private readonly _items: MenuItemResponseService[];

  constructor(categoryName: string, items: MenuItemResponseService[]) {
    this._categoryName = categoryName;
    this._items = items;
  }

  getCategoryName(): string {
    return this._categoryName;
  }

  getItems(): MenuItemResponseService[] {
    return this._items;
  }

  getCount(): number {
    return this._items.length;
  }
}

export class MenuResponseService {
  private readonly _vendorId: string;
  private readonly _categories: MenuCategoryResponseService[];
  private readonly _totalItems: number;

  constructor(vendorId: string, categories: MenuCategoryResponseService[], totalItems: number) {
    this._vendorId = vendorId;
    this._categories = categories;
    this._totalItems = totalItems;
  }

  getVendorId(): string {
    return this._vendorId;
  }

  getCategories(): MenuCategoryResponseService[] {
    return this._categories;
  }

  getTotalItems(): number {
    return this._totalItems;
  }

  static fromEntities(products: Product[], vendorId: string): MenuResponseService {
    const grouped = new Map<string, MenuItemResponseService[]>();

    for (const product of products) {
      const item = MenuItemResponseService.fromEntity(product);
      const key = product.getCategory() || 'Sin categoría';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(item);
    }

    const categories = Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([categoryName, items]) => new MenuCategoryResponseService(categoryName, items));

    return new MenuResponseService(vendorId, categories, products.length);
  }
}