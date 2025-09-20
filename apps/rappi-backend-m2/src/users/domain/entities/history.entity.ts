export class History {
  private _orders: string[];
  private _deliveries: string[];

  constructor(orders: string[], deliveries: string[]) {
    this._orders = orders;
    this._deliveries = deliveries;
  }

  getOrders(): string[] {
    return this._orders;
  }

  getDeliveries(): string[] {
    return this._deliveries;
  }
}
