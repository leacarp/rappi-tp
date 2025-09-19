export class PromotionResponseDto {
  constructor(
    public readonly isOnPromotion: boolean,
    public readonly discountedPrice: number
  ) {}
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
        product.promotions.isOnPromotion,
        product.promotions.discountedPrice
      ),
      product.getFinalPrice(),
      product.getDiscountPercentage()
    );
  }
}
