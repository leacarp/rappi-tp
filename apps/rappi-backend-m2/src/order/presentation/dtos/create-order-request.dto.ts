import { IsNotEmpty, ValidateNested, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PickUpLocationRequestDto } from './order-dto.request/pickupLocation-request.dto';
import { ItemsRequestDto } from './order-dto.request/items-request.dto';
import { SummaryRequestDto } from './order-dto.request/summary-request.dto';
import { PaymentRequestDto } from './order-dto.request/payment-request.dto';
import { CreateOrderDto } from '../../services/dtos/order/create-order-service.dto';

export class CreateOrderRequestDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  vendorId: string;

  @ValidateNested()
  @Type(() => PickUpLocationRequestDto)
  pickupLocation: PickUpLocationRequestDto;

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
