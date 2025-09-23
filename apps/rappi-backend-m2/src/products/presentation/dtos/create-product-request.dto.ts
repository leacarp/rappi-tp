import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class PromotionDto {
  @IsBoolean()
  isOnPromotion: boolean;

  @IsNumber()
  @Min(0)
  discountedPrice: number;
}

export class CreateProductRequestDto {
  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @ValidateNested()
  @Type(() => PromotionDto)
  @IsOptional()
  promotions?: PromotionDto = { isOnPromotion: false, discountedPrice: 0 };
}
