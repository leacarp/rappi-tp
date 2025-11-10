import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CreateProductServiceDto } from '../../services/dtos/create-product-service.dto';

class PromotionDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isOnPromotion: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  discountedPrice: number;
}

export class CreateProductRequestDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @ApiProperty({ type: PromotionDto, required: false })
  @ValidateNested()
  @Type(() => PromotionDto)
  @IsOptional()
  promotions?: PromotionDto = { isOnPromotion: false, discountedPrice: 0 };

  toServiceDto(): CreateProductServiceDto {
    return new CreateProductServiceDto(
      this.vendorId,
      this.name,
      this.description,
      this.imageURL,
      this.price,
      this.category,
      this.isAvailable ?? true,
      this.promotions ?? { isOnPromotion: false, discountedPrice: 0 }
    );
  }
}