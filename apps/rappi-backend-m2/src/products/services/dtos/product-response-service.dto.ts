import { Product } from '../../domain/entities/product.entity';

export class PromotionResponseService {
  private readonly _isOnPromotion: boolean;
  private readonly _discountedPrice: number;

  constructor(isOnPromotion: boolean, discountedPrice: number) {
    this._isOnPromotion = isOnPromotion;
    this._discountedPrice = discountedPrice;
  }

  getIsOnPromotion(): boolean {
    return this._isOnPromotion;
  }

  getDiscountedPrice(): number {
    return this._discountedPrice;
  }
}

export class ProductResponseService {
  private readonly _id: string;
  private readonly _vendorId: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _imageURL: string;
  private readonly _price: number;
  private readonly _category: string;
  private readonly _isAvailable: boolean;
  private readonly _promotions: PromotionResponseService;
  private readonly _finalPrice: number;
  private readonly _discountPercentage: number;

  constructor(
    id: string,
    vendorId: string,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    category: string,
    isAvailable: boolean,
    promotions: PromotionResponseService,
    finalPrice: number,
    discountPercentage: number
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
    this._finalPrice = finalPrice;
    this._discountPercentage = discountPercentage;
  }

  getId(): string {
    return this._id;
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

  getPromotions(): PromotionResponseService {
    return this._promotions;
  }

  getFinalPrice(): number {
    return this._finalPrice;
  }

  getDiscountPercentage(): number {
    return this._discountPercentage;
  }

  static fromEntity(product: Product): ProductResponseService {
    const promotions = product.getPromotions();
    
    return new ProductResponseService(
      product.getId().toString(),
      product.getVendorId().toString(),
      product.getName(),
      product.getDescription(),
      product.getImageURL(),
      product.getPrice(),
      product.getCategory(),
      product.getIsAvailable(),
      new PromotionResponseService(
        promotions.isOnPromotion,
        promotions.discountedPrice
      ),
      product.getFinalPrice(),
      product.getDiscountPercentage()
    );
  }
}