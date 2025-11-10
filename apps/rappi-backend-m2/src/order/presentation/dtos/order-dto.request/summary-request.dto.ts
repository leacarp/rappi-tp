import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { SummaryDtoService } from '../../../services/dtos/order/summary-service.dto';

export class SummaryRequestDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  shippingCost: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  total: number;

  toServiceDto(): SummaryDtoService {
    return new SummaryDtoService(this.subtotal, this.shippingCost, this.taxes, this.discount, this.total);
  }
}