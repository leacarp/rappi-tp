export class Summary {
  private _subtotal: number;
  private _shippingCost: number;
  private _taxes: number;
  private _discount: number;
  private _total: number;

  constructor(subtotal: number, shippingCost: number, taxes: number, discount: number, total: number){
    this._subtotal = subtotal;
    this._shippingCost = shippingCost;
    this._taxes = taxes;
    this._discount = discount;
    this._total = total;
  }
 
  getSubTotal(): number{
    return this._subtotal;
  }

  getShippingCost(): number {
    return this._shippingCost;
  }

  getTaxes(): number {
    return this._taxes;
  }

  getDiscount(): number {
    return this._discount;
  }

  getTotal(): number {
    return this._total;
  }
}