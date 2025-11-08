import { SummaryServiceResponse } from "../../../services/dtos/order-response/summary-service-response.dto";

export class SummaryDto {
  private readonly subtotal: number;
  private readonly shippingCost: number;
  private readonly taxes: number;
  private readonly discount: number;
  private readonly total: number;

  constructor(subtotal: number, shippingCost: number, taxes: number, discount: number, total: number) {
    this.subtotal = subtotal;
    this.shippingCost = shippingCost;
    this.taxes = taxes;
    this.discount = discount;
    this.total = total;
  }

  getSubtotal(): number {
    return this.subtotal;
  }

  getShippingCost(): number {
    return this.shippingCost;
  }

  getTaxes(): number {
    return this.taxes;
  }

  getDiscount(): number {
    return this.discount;
  }

  getTotal(): number {
    return this.total;
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