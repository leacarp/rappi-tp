import { PromotionResponseDto } from './product-response.dto';
import { MenuItemResponseService, MenuResponseService } from '../../services/dtos/menu-response-service.dto';

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

  getPromotions(): PromotionResponseDto {
    return this._promotions;
  }

  static fromServiceDto(serviceDto: MenuItemResponseService): MenuItemResponseDto {
    const promotions = serviceDto.getPromotions();

    return new MenuItemResponseDto(
      serviceDto.getName(),
      serviceDto.getDescription(),
      serviceDto.getImageURL(),
      serviceDto.getPrice(),
      serviceDto.getFinalPrice(),
      serviceDto.getDiscountPercentage(),
      serviceDto.getIsAvailable(),
      new PromotionResponseDto(promotions.getIsOnPromotion(), promotions.getDiscountedPrice())
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
        isOnPromotion: this._promotions.getIsOnPromotion(),
        discountedPrice: this._promotions.getDiscountedPrice(),
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

  getCategoryName(): string {
    return this._categoryName;
  }

  getItems(): MenuItemResponseDto[] {
    return this._items;
  }

  getCount(): number {
    return this._items.length;
  }

  toJSON() {
    return {
      categoryName: this._categoryName,
      items: this._items.map(i => i.toJSON()),
      count: this.getCount(),
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

  getVendorId(): string {
    return this._vendorId;
  }

  getCategories(): MenuCategoryResponseDto[] {
    return this._categories;
  }

  getTotalItems(): number {
    return this._totalItems;
  }

  static fromServiceDto(serviceDto: MenuResponseService): MenuResponseDto {
    const categories = serviceDto.getCategories().map(categoryService => {
      const items = categoryService.getItems().map(itemService => 
        MenuItemResponseDto.fromServiceDto(itemService)
      );
      return new MenuCategoryResponseDto(categoryService.getCategoryName(), items);
    });

    return new MenuResponseDto(
      serviceDto.getVendorId(),
      categories,
      serviceDto.getTotalItems()
    );
  }

  toJSON() {
    return {
      vendorId: this._vendorId,
      categories: this._categories.map(c => c.toJSON()),
      totalItems: this._totalItems,
    };
  }
}