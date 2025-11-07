import { SummaryServiceResponse } from "../../../services/dtos/order-response/summary-service-response.dto";

export class SummaryDto {
  private readonly _subtotal: number;
  private readonly _shippingCost: number;
  private readonly _taxes: number;
  private readonly _discount: number;
  private readonly _total: number;

  constructor(subtotal: number, shippingCost: number, taxes: number, discount: number, total: number) {
    this._subtotal = subtotal;
    this._shippingCost = shippingCost;
    this._taxes = taxes;
    this._discount = discount;
    this._total = total;
  }

  getSubtotal(): number {
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

  static fromServiceDto(serviceDto: SummaryServiceResponse): SummaryDto {
    return new SummaryDto(
      serviceDto.getSubtotal(),
      serviceDto.getShippingCost(),
      serviceDto.getTaxes(),
      serviceDto.getDiscount(),
      serviceDto.getTotal()
    );
  }
}