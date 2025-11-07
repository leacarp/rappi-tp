import { IsNotEmpty, IsString } from 'class-validator';

import { PaymentDtoService } from '../../../services/dtos/order/payment-service.dto';

export class PaymentRequestDto {
  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  transactionId: string;

  toServiceDto(): PaymentDtoService {
    return new PaymentDtoService(this.method, this.status, this.transactionId);
  }
}