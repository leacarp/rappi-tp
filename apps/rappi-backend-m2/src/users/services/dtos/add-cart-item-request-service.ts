export class AddCartItemRequestService {
  constructor(private readonly productId: string) {}
  getProductId(): string { return this.productId; }
}