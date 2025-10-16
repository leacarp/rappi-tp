import { PickupLocationDtoService } from './pickupLocation-service.dto';
import { DeliveryLocationDtoService } from './deliveryLocation-service.dto';
import { ItemsDtoService } from './items-service.dto';
import { SummaryDtoService } from './summary-service.dto';
import { PaymentDtoService } from './payment-service.dto';
import { OrderEntity } from '../../../domain/entities/order.entity';

export class CreateOrderDto {
  private readonly _customerId: string;
  private readonly _vendorId: string;
  private readonly _driverId: string;
  private readonly _pickupLocation: PickupLocationDtoService;
  private readonly _deliveryLocation: DeliveryLocationDtoService;
  private readonly _items: ItemsDtoService[];
  private readonly _summary: SummaryDtoService;
  private readonly _payment: PaymentDtoService;
  private readonly _trackingNumber: string;
  private readonly _notes: string;

  constructor(
    customerId: string,
    vendorId: string,
    driverId: string,
    pickupLocation: PickupLocationDtoService,
    deliveryLocation: DeliveryLocationDtoService,
    items: ItemsDtoService[],
    summary: SummaryDtoService,
    payment: PaymentDtoService,
    trackingNumber: string,
    notes: string
  ) {
    this._customerId = customerId;
    this._vendorId = vendorId;
    this._driverId = driverId;
    this._pickupLocation = pickupLocation;
    this._deliveryLocation = deliveryLocation;
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

  getDriverId(): string {
    return this._driverId;
  }

  getPickupLocation(): PickupLocationDtoService {
    return this._pickupLocation;
  }

  getDeliveryLocation(): DeliveryLocationDtoService {
    return this._deliveryLocation;
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
      order.getDriverId().toHexString(),
      PickupLocationDtoService.fromEntity(order.getPickupLocation()),
      DeliveryLocationDtoService.fromEntity(order.getDeliveryLocation()),
      order.getItems().map(ItemsDtoService.fromEntity),
      SummaryDtoService.fromEntity(order.getSummary()),
      PaymentDtoService.fromEntity(order.getPayment()),
      order.getTrackingNumber(),
      order.getNotes()
    );
  }
}

