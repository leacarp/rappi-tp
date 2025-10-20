export class SetCartItemQuantityRequestService {
  constructor(private readonly productId: string, private readonly quantity: number) {}
  getProductId(): string { return this.productId; }
  getQuantity(): number { return this.quantity; }
}