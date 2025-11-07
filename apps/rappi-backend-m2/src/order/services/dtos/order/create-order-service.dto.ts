import { Types } from 'mongoose';
import { PickupLocationDtoService } from './pickupLocation-service.dto';
import { ItemsDtoService } from './items-service.dto';
import { SummaryDtoService } from './summary-service.dto';
import { PaymentDtoService } from './payment-service.dto';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { OrderStatus } from '../../../domain/enum/order-status';
import { Items } from '../../../domain/entities/items.entity';

export class CreateOrderDto {
  private readonly _customerId: string;
  private readonly _vendorId: string;
  private readonly _pickupLocation: PickupLocationDtoService;
  private readonly _items: ItemsDtoService[];
  private readonly _summary: SummaryDtoService;
  private readonly _payment: PaymentDtoService;
  private readonly _trackingNumber: string;
  private readonly _notes: string;

  constructor(
    customerId: string,
    vendorId: string,
    pickupLocation: PickupLocationDtoService,
    items: ItemsDtoService[],
    summary: SummaryDtoService,
    payment: PaymentDtoService,
    trackingNumber: string,
    notes: string
  ) {
    this._customerId = customerId;
    this._vendorId = vendorId;
    this._pickupLocation = pickupLocation;
    this._items = items;
    this._summary = summary;
    this._payment = payment;
    this._trackingNumber = trackingNumber;
    this._notes = notes;
  }

  getCustomerId(): string {
    return this._customerId;
  }

  getVendorId(): string {
    return this._vendorId;
  }

  getPickupLocation(): PickupLocationDtoService {
    return this._pickupLocation;
  }

  getItems(): ItemsDtoService[] {
    return this._items;
  }

  getSummary(): SummaryDtoService {
    return this._summary;
  }

  getPayment(): PaymentDtoService {
    return this._payment;
  }

  getTrackingNumber(): string {
    return this._trackingNumber;
  }

  getNotes(): string {
    return this._notes;
  }

  static fromEntity(order: OrderEntity): CreateOrderDto {
    return new CreateOrderDto(
      order.getCustomerId().toHexString(),
      order.getVendorId().toHexString(),
      PickupLocationDtoService.fromEntity(order.getPickupLocation()),
      order.getItems().map(ItemsDtoService.fromEntity),
      SummaryDtoService.fromEntity(order.getSummary()),
      PaymentDtoService.fromEntity(order.getPayment()),
      order.getTrackingNumber(),
      order.getNotes()
    );
  }

  static toEntity(createOrderDto: CreateOrderDto, items: Items[]): OrderEntity {
    return new OrderEntity(
      new Types.ObjectId(),
      new Types.ObjectId(createOrderDto.getCustomerId()),
      new Types.ObjectId(createOrderDto.getVendorId()),
      null,
      OrderStatus.Pending,
      PickupLocationDtoService.toEntity(createOrderDto.getPickupLocation()),
      null,
      items,
      SummaryDtoService.toEntity(createOrderDto.getSummary()),
      PaymentDtoService.toEntity(createOrderDto.getPayment()),
      createOrderDto.getTrackingNumber(),
      createOrderDto.getNotes()
    );
  }
}