import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ProductOfItemRequestDto } from './productOfItem-request.dto';
import { ItemsDtoService } from '../../../services/dtos/order/items-service.dto';

export class ItemsRequestDto {
  @ValidateNested()
  @Type(() => ProductOfItemRequestDto)
  @IsNotEmpty()
  product: ProductOfItemRequestDto;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  toServiceDto(): ItemsDtoService {
    return new ItemsDtoService(this.product.toServiceDto(), this.quantity);
  }
}
