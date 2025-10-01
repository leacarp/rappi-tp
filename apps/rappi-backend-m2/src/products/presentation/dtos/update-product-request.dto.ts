import { IsString, IsNumber, IsBoolean, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class PromotionDto {
  @IsBoolean()
  isOnPromotion: boolean;

  @IsNumber()
  @Min(0)
  discountedPrice: number;
}

export class UpdateProductRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageURL?: string;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ValidateNested()
  @Type(() => PromotionDto)
  @IsOptional()
  promotions?: PromotionDto;

  // Método para convertir a DTO de servicio
  toServiceDto(): import('../../application/dtos/update-product-service.dto').UpdateProductServiceDto {
    const { UpdateProductServiceDto } = require('../../application/dtos/update-product-service.dto');
    return new UpdateProductServiceDto({
      name: this.name,
      description: this.description,
      imageURL: this.imageURL,
      price: this.price,
      category: this.category,
      isAvailable: this.isAvailable,
      promotions: this.promotions
    });
  }
}
