import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaymentDtoService } from '../../../services/dtos/order/payment-service.dto';

export class PaymentRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  method: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  toServiceDto(): PaymentDtoService {
    return new PaymentDtoService(this.method, this.status, this.transactionId);
  }
}