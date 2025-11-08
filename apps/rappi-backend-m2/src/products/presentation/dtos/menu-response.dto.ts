import { PromotionResponseDto } from './product-response.dto';
import { MenuItemResponseService, MenuResponseService } from '../../services/dtos/menu-response-service.dto';

export class MenuItemResponseDto {
  private readonly name: string;
  private readonly description: string;
  private readonly imageURL: string;
  private readonly price: number;
  private readonly finalPrice: number;
  private readonly discountPercentage: number;
  private readonly isAvailable: boolean;
  private readonly promotions: PromotionResponseDto;

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
    this.name = name;
    this.description = description;
    this.imageURL = imageURL;
    this.price = price;
    this.finalPrice = finalPrice;
    this.discountPercentage = discountPercentage;
    this.isAvailable = isAvailable;
    this.promotions = promotions;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getImageURL(): string {
    return this.imageURL;
  }

  getPrice(): number {
    return this.price;
  }
  
  getFinalPrice(): number {
    return this.finalPrice;
  }

  getDiscountPercentage(): number {
    return this.discountPercentage;
  }

  getIsAvailable(): boolean {
    return this.isAvailable; 
  }

  getPromotions(): PromotionResponseDto {
    return this.promotions;
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
      name: this.name,
      description: this.description,
      imageURL: this.imageURL,
      price: this.price,
      finalPrice: this.finalPrice,
      discountPercentage: this.discountPercentage,
      isAvailable: this.isAvailable,
      promotions: {
        isOnPromotion: this.promotions.getIsOnPromotion(),
        discountedPrice: this.promotions.getDiscountedPrice(),
      },
    };
  }
}

export class MenuCategoryResponseDto {
  private readonly categoryName: string;
  private readonly items: MenuItemResponseDto[];

  constructor(categoryName: string, items: MenuItemResponseDto[]) {
    this.categoryName = categoryName;
    this.items = items;
  }

  getCategoryName(): string {
    return this.categoryName;
  }

  getItems(): MenuItemResponseDto[] {
    return this.items;
  }

  getCount(): number {
    return this.items.length;
  }

  toJSON() {
    return {
      categoryName: this.categoryName,
      items: this.items.map(i => i.toJSON()),
      count: this.getCount(),
    };
  }
}

export class MenuResponseDto {
  private readonly vendorId: string;
  private readonly categories: MenuCategoryResponseDto[];
  private readonly totalItems: number;

  constructor(vendorId: string, categories: MenuCategoryResponseDto[], totalItems: number) {
    this.vendorId = vendorId;
    this.categories = categories;
    this.totalItems = totalItems;
  }

  getVendorId(): string {
    return this.vendorId;
  }

  getCategories(): MenuCategoryResponseDto[] {
    return this.categories;
  }

  getTotalItems(): number {
    return this.totalItems;
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
      vendorId: this.vendorId,
      categories: this.categories.map(c => c.toJSON()),
      totalItems: this.totalItems,
    };
  }
}