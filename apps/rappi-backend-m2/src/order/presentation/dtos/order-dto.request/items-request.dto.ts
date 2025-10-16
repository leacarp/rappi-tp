import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ProductOfItemRequestDto } from './productOfItem-request.dto';

export class ItemsRequestDto {
  @ValidateNested()
  @Type(() => ProductOfItemRequestDto)
  @IsNotEmpty()
  product: ProductOfItemRequestDto;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
