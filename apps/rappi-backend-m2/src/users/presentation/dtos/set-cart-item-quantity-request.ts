import { IsInt, Min } from 'class-validator';

import { SetCartItemQuantityRequestService } from '../../services/dtos/set-cart-item-quantity-request-service';

export class SetCartItemQuantityRequest {
  @IsInt({ message: 'La cantidad debe ser entero' })
  @Min(0, { message: 'La cantidad mínima es 0' })
  private readonly quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
  }

  toServiceDto(productId: string): SetCartItemQuantityRequestService {
    return new SetCartItemQuantityRequestService(productId, this.quantity);
  }
}