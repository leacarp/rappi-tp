import { CartItem } from '../../domain/entities/cart-item.entity';

export class GetCartResponseService {
  constructor(
    private readonly items: CartItemService[],
    private readonly subtotal: number,
    private readonly total: number
  ) {}

  getItems(): CartItemService[] { return this.items; }
  getSubtotal(): number { return this.subtotal; }
  getTotal(): number { return this.total; }

  static fromEntities(cartItems: CartItem[]): GetCartResponseService {
    const items = cartItems.map(ci => new CartItemService(
      ci.getProductId(),
      ci.getName(),
      ci.getPrice(),
      ci.getQuantity()
    ));
    const subtotal = items.reduce((acc, it) => acc + it.getPrice() * it.getQuantity(), 0);
    const total = subtotal; 
    return new GetCartResponseService(items, subtotal, total);
  }
}

export class CartItemService {
  constructor(
    private readonly productId: string,
    private readonly name: string,
    private readonly price: number,
    private readonly quantity: number
  ) {}

  getProductId(): string { return this.productId; }
  getName(): string { return this.name; }
  getPrice(): number { return this.price; }
  getQuantity(): number { return this.quantity; }
}