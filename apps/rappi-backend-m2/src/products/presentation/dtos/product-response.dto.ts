export class PromotionResponseDto {
  private readonly _isOnPromotion: boolean;
  private readonly _discountedPrice: number;

  constructor(isOnPromotion: boolean, discountedPrice: number) {
    this._isOnPromotion = isOnPromotion;
    this._discountedPrice = discountedPrice;
  }

  get isOnPromotion(): boolean {
    return this._isOnPromotion;
  }

  get discountedPrice(): number {
    return this._discountedPrice;
  }
}

export class ProductResponseDto {
  private readonly _id: string;
  private readonly _vendorId: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _imageURL: string;
  private readonly _price: number;
  private readonly _category: string;
  private readonly _isAvailable: boolean;
  private readonly _promotions: PromotionResponseDto;
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
    promotions: PromotionResponseDto,
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

  get id(): string {
    return this._id;
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

  get promotions(): PromotionResponseDto {
    return this._promotions;
  }

  get finalPrice(): number {
    return this._finalPrice;
  }

  get discountPercentage(): number {
    return this._discountPercentage;
  }

  // Método factory para crear desde entidad del dominio
  static fromEntity(product: any): ProductResponseDto {
    // Extraer promotions correctamente (manejar subdocumentos de Mongoose)
    const promotions = product.promotions;
    const promotionData = promotions._doc || promotions || { isOnPromotion: false, discountedPrice: 0 };
    
    return new ProductResponseDto(
      product.id.toString(),
      product.vendorId.toString(),
      product.name,
      product.description,
      product.imageURL,
      product.price,
      product.category,
      product.isAvailable,
      new PromotionResponseDto(
        promotionData.isOnPromotion,
        promotionData.discountedPrice
      ),
      product.getFinalPrice(),
      product.getDiscountPercentage()
    );
  }
}
