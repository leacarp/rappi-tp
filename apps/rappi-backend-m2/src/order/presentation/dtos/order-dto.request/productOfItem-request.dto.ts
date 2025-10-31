import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ProductOfItemDtoService } from '../../../services/dtos/order/productOfItem.dto';

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

  toServiceDto(): ProductOfItemDtoService {
    return new ProductOfItemDtoService(this.productId, this.name, this.price);
  }
}
