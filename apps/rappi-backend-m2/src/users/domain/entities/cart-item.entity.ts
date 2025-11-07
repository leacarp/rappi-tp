export class CartItem {
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
    if (!productId || !name) throw new Error('Producto inválido');
    if (quantity < 0) throw new Error('Cantidad no puede ser negativa');
    if (price < 0) throw new Error('Precio no puede ser negativo');

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