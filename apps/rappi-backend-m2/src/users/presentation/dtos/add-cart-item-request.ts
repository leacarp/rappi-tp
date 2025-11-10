import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AddCartItemRequestService } from '../../services/dtos/add-cart-item-request-service';

export class AddCartItemRequest {
  @ApiProperty({ type: String })
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