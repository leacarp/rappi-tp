export class CartItem {
  constructor(
    private readonly _productId: string,
    private readonly _name: string,
    private readonly _price: number,
    private readonly _quantity: number
  ) {
    if (!_productId || !_name) throw new Error('Producto inválido');
    if (_quantity < 0) throw new Error('Cantidad no puede ser negativa');
    if (_price < 0) throw new Error('Precio no puede ser negativo');
  }

  getProductId(): string { return this._productId; }
  getName(): string { return this._name; }
  getPrice(): number { return this._price; }
  getQuantity(): number { return this._quantity; }
}