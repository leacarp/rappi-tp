import { GetCartResponseService, CartItemService } from '../../services/dtos/get-cart-response-service';

export class GetCartResponse {
  constructor(
    private readonly items: CartItemResponse[],
    private readonly subtotal: number,
    private readonly total: number
  ) {}

  static fromServiceDto(serviceDto: GetCartResponseService): GetCartResponse {
    return new GetCartResponse(
      serviceDto.getItems().map(ci => CartItemResponse.fromService(ci)),
      serviceDto.getSubtotal(),
      serviceDto.getTotal()
    );
  }
}

export class CartItemResponse {
  constructor(
    private readonly productId: string,
    private readonly name: string,
    private readonly price: number,
    private readonly quantity: number
  ) {}

  static fromService(service: CartItemService): CartItemResponse {
    return new CartItemResponse(
      service.getProductId(),
      service.getName(),
      service.getPrice(),
      service.getQuantity()
    );
  }
}