import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../domain/enum/order-status';

export class UpdateOrderStatusRequestDto {
  @ApiProperty({ enum: OrderStatus })
  @IsNotEmpty()
  @IsEnum(OrderStatus, { message: 'Estado inválido' })
  status: OrderStatus;
}