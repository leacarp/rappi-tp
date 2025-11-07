import { IsNotEmpty, IsNumber } from 'class-validator';

import { SummaryDtoService } from '../../../services/dtos/order/summary-service.dto';

export class SummaryRequestDto {
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  shippingCost: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  toServiceDto(): SummaryDtoService {
    return new SummaryDtoService(this.subtotal, this.shippingCost, this.taxes, this.discount, this.total);
  }
}