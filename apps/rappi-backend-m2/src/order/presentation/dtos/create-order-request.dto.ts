import { IsNotEmpty, ValidateNested, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PickUpLocationRequestDto } from './order-dto.request/pickupLocation-request.dto';
import { ItemsRequestDto } from './order-dto.request/items-request.dto';
import { SummaryRequestDto } from './order-dto.request/summary-request.dto';
import { PaymentRequestDto } from './order-dto.request/payment-request.dto';
import { CreateOrderDto } from '../../services/dtos/order/create-order-service.dto';

export class CreateOrderRequestDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @ApiProperty({ type: PickUpLocationRequestDto })
  @ValidateNested()
  @Type(() => PickUpLocationRequestDto)
  pickupLocation: PickUpLocationRequestDto;

  @ApiProperty({ type: [ItemsRequestDto] })
  @ValidateNested({ each: true })
  @Type(() => ItemsRequestDto)
  @IsArray()
  items: ItemsRequestDto[];

  @ApiProperty({ type: SummaryRequestDto })
  @ValidateNested()
  @Type(() => SummaryRequestDto)
  summary: SummaryRequestDto;

  @ApiProperty({ type: PaymentRequestDto })
  @ValidateNested()
  @Type(() => PaymentRequestDto)
  payment: PaymentRequestDto;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  trackingNumber: string;

  @ApiProperty({ type: String })
  @IsString()
  notes: string;

  toServiceDto(): CreateOrderDto {
    return new CreateOrderDto(
      this.customerId,
      this.vendorId,
      this.pickupLocation.toServiceDto(),
      this.items.map(item => item.toServiceDto()),
      this.summary.toServiceDto(),
      this.payment.toServiceDto(),
      this.trackingNumber,
      this.notes
    );
  }
}
