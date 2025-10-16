import { IsNotEmpty, IsNumber } from 'class-validator';

export class SummaryRequestDto {
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  shippingCost: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
