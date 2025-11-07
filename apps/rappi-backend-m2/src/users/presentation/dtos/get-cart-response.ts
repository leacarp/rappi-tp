import { GetCartResponseService, CartItemService } from '../../services/dtos/get-cart-response-service';

export class GetCartResponse {
  private readonly items: CartItemResponse[];
  private readonly subtotal: number;
  private readonly total: number;

  constructor(items: CartItemResponse[], subtotal: number, total: number) {
    this.items = items;
    this.subtotal = subtotal;
    this.total = total;
  }

  getItems(): CartItemResponse[] {
    return this.items;
  }

  getSubtotal(): number {
    return this.subtotal;
  }

  getTotal(): number {
    return this.total;
  }

  static fromServiceDto(serviceDto: GetCartResponseService): GetCartResponse {
    return new GetCartResponse(
      serviceDto.getItems().map(ci => CartItemResponse.fromService(ci)),
      serviceDto.getSubtotal(),
      serviceDto.getTotal()
    );
  }
}

export class CartItemResponse {
  private readonly productId: string;
  private readonly name: string;
  private readonly price: number;
  private readonly quantity: number;

  constructor(
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getProductId(): string {
    return this.productId;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  static fromService(service: CartItemService): CartItemResponse {
    return new CartItemResponse(
      service.getProductId(),
      service.getName(),
      service.getPrice(),
      service.getQuantity()
    );
  }
}