export class PromotionResponseDto {
  public readonly isOnPromotion: boolean;
  public readonly discountedPrice: number;

  constructor(isOnPromotion: boolean, discountedPrice: number) {
    this.isOnPromotion = isOnPromotion;
    this.discountedPrice = discountedPrice;
  }
}

export class ProductResponseDto {
  constructor(
    public readonly id: string,
    public readonly vendorId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly imageURL: string,
    public readonly price: number,
    public readonly category: string,
    public readonly isAvailable: boolean,
    public readonly promotions: PromotionResponseDto,
    public readonly finalPrice: number,
    public readonly discountPercentage: number
  ) {}

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
