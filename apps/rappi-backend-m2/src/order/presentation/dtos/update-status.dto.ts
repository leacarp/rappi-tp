import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../domain/enum/order-status';

export class UpdateOrderStatusRequestDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus, { message: 'Estado inválido' })
  status: OrderStatus;
}
