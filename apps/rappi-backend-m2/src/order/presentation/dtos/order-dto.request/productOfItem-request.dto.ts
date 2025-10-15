import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProductOfItemRequestDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
