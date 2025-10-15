import { IsNotEmpty, ValidateNested, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PickUpLocationRequestDto } from './order-dto.request/pickupLocation-request.dto';
import { DeliveryLocationRequestDto } from './order-dto.request/deliveryLocation-request.dto';
import { ItemsRequestDto } from './order-dto.request/items-request.dto';
import { SummaryRequestDto } from './order-dto.request/summary-request.dto';
import { PaymentRequestDto } from './order-dto.request/payment-request.dto';

export class CreateOrderRequestDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @IsNotEmpty()
  @IsString()
  driverId: string;

  @ValidateNested()
  @Type(() => PickUpLocationRequestDto)
  pickupLocation: PickUpLocationRequestDto;

  @ValidateNested()
  @Type(() => DeliveryLocationRequestDto)
  deliveryLocation: DeliveryLocationRequestDto;

  @ValidateNested({ each: true })
  @Type(() => ItemsRequestDto)
  @IsArray()
  items: ItemsRequestDto[];

  @ValidateNested()
  @Type(() => SummaryRequestDto)
  summary: SummaryRequestDto;

  @ValidateNested()
  @Type(() => PaymentRequestDto)
  payment: PaymentRequestDto;

  @IsNotEmpty()
  @IsString()
  trackingNumber: string;

  @IsString()
  notes: string;
}
