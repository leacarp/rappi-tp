export class SetCartItemQuantityRequestService {
  private readonly _productId: string;
  private readonly _quantity: number;

  constructor(productId: string, quantity: number) {
    this._productId = productId;
    this._quantity = quantity;
  }

  getProductId(): string {
    return this._productId;
  }

  getQuantity(): number {
    return this._quantity;
  }
}