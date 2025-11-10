import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ProductOfItemDtoService } from '../../../services/dtos/order/productOfItem.dto';

export class ProductOfItemRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  toServiceDto(): ProductOfItemDtoService {
    return new ProductOfItemDtoService(this.productId, this.name, this.price);
  }
}