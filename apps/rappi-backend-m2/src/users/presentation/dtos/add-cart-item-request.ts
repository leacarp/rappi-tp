import { IsString, IsNotEmpty } from 'class-validator';
import { AddCartItemRequestService } from '../../services/dtos/add-cart-item-request-service';

export class AddCartItemRequest {
  @IsString({ message: 'productId debe ser string' })
  @IsNotEmpty({ message: 'productId es requerido' })
  private readonly productId: string;

  constructor(productId: string) {
    this.productId = productId;
  }

  toServiceDto(): AddCartItemRequestService {
    return new AddCartItemRequestService(this.productId);
  }
}