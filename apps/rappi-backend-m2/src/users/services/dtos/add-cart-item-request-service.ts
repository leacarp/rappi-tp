export class AddCartItemRequestService {
  private readonly _productId: string;

  constructor(productId: string) {
    this._productId = productId;
  }

  getProductId(): string {
    return this._productId;
  }
}