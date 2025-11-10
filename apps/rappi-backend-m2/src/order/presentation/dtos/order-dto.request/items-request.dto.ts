import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ProductOfItemRequestDto } from './productOfItem-request.dto';
import { ItemsDtoService } from '../../../services/dtos/order/items-service.dto';

export class ItemsRequestDto {
  @ApiProperty({ type: ProductOfItemRequestDto })
  @ValidateNested()
  @Type(() => ProductOfItemRequestDto)
  @IsNotEmpty()
  product: ProductOfItemRequestDto;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  toServiceDto(): ItemsDtoService {
    return new ItemsDtoService(this.product.toServiceDto(), this.quantity);
  }
}