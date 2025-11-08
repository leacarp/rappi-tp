import { ProductResponseService } from "../../services/dtos/product-response-service.dto";

export class PromotionResponseDto {
  private readonly isOnPromotion: boolean;
  private readonly discountedPrice: number;

  constructor(isOnPromotion: boolean, discountedPrice: number) {
    this.isOnPromotion = isOnPromotion;
    this.discountedPrice = discountedPrice;
  }

  getIsOnPromotion(): boolean {
    return this.isOnPromotion;
  }

  getDiscountedPrice(): number {
    return this.discountedPrice;
  }
}

export class ProductResponseDto {
  private readonly id: string;
  private readonly vendorId: string;
  private readonly name: string;
  private readonly description: string;
  private readonly imageURL: string;
  private readonly price: number;
  private readonly category: string;
  private readonly isAvailable: boolean;
  private readonly promotions: PromotionResponseDto;
  private readonly finalPrice: number;
  private readonly discountPercentage: number;

  constructor(
    id: string,
    vendorId: string,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    category: string,
    isAvailable: boolean,
    promotions: PromotionResponseDto,
    finalPrice: number,
    discountPercentage: number
  ) {
    this.id = id;
    this.vendorId = vendorId;
    this.name = name;
    this.description = description;
    this.imageURL = imageURL;
    this.price = price;
    this.category = category;
    this.isAvailable = isAvailable;
    this.promotions = promotions;
    this.finalPrice = finalPrice;
    this.discountPercentage = discountPercentage;
  }

  getId(): string {
    return this.id;
  }

  getVendorId(): string {
    return this.vendorId;
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

  getCategory(): string {
    return this.category;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }

  getPromotions(): PromotionResponseDto {
    return this.promotions;
  }

  getFinalPrice(): number {
    return this.finalPrice;
  }

  getDiscountPercentage(): number {
    return this.discountPercentage;
  }

  static fromServiceDto(serviceDto: ProductResponseService): ProductResponseDto {
    const promotions = serviceDto.getPromotions();
    
    return new ProductResponseDto(
      serviceDto.getId(),
      serviceDto.getVendorId(),
      serviceDto.getName(),
      serviceDto.getDescription(),
      serviceDto.getImageURL(),
      serviceDto.getPrice(),
      serviceDto.getCategory(),
      serviceDto.getIsAvailable(),
      new PromotionResponseDto(
        promotions.getIsOnPromotion(),
        promotions.getDiscountedPrice()
      ),
      serviceDto.getFinalPrice(),
      serviceDto.getDiscountPercentage()
    );
  }
}