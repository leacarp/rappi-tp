import { CartItem } from '../../domain/entities/cart-item.entity';

export class GetCartResponseService {
  private readonly _items: CartItemService[];
  private readonly _subtotal: number;
  private readonly _total: number;

  constructor(
    items: CartItemService[],
    subtotal: number,
    total: number
  ) {
    this._items = items;
    this._subtotal = subtotal;
    this._total = total;
  }

  getItems(): CartItemService[] {
    return this._items;
  }

  getSubtotal(): number {
    return this._subtotal;
  }

  getTotal(): number {
    return this._total;
  }

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
  private readonly _productId: string;
  private readonly _name: string;
  private readonly _price: number;
  private readonly _quantity: number;

  constructor(
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  getProductId(): string {
    return this._productId;
  }

  getName(): string {
    return this._name;
  }

  getPrice(): number {
    return this._price;
  }

  getQuantity(): number {
    return this._quantity;
  }  
}