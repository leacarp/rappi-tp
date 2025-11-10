import { IsString, IsNumber, IsBoolean, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UpdateProductServiceDto } from '../../services/dtos/update-product-service.dto';

class PromotionDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isOnPromotion: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  discountedPrice: number;
}

export class UpdateProductRequestDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  imageURL?: string;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Min(0.01)
  @IsOptional()
  price?: number;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ type: PromotionDto, required: false })
  @ValidateNested()
  @Type(() => PromotionDto)
  @IsOptional()
  promotions?: PromotionDto;

  toServiceDto(): UpdateProductServiceDto {
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