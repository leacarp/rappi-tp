import { DeliveryLocationDto } from "./order-dto-response/deliveryLocation.dto";
import { PickupLocationDto } from "./order-dto-response/pickupLocation.dto";
import { ItemsDto } from "./order-dto-response/items.dto";
import { PaymentDto } from "./order-dto-response/payment.dto";
import { SummaryDto } from "./order-dto-response/summary.dto";
import { UserBasicDto } from "./order-dto-response/user-basic.dto";
import { OrderEntity } from "../../domain/entities/order.entity";
import { CustomerBasicDto } from "./order-dto-response/customer-basic.dto";

export class GetOrderResponseDto {
  private readonly _id: string;
  private readonly _customer: CustomerBasicDto;
  private readonly _vendor: UserBasicDto;
  private readonly _driver: UserBasicDto | null;
  private readonly _status: string;
  private readonly _createdAt: Date;
  private readonly _pickupLocation: PickupLocationDto;
  private readonly _deliveryLocation: DeliveryLocationDto | null;
  private readonly _items: ItemsDto[];
  private readonly _summary: SummaryDto;
  private readonly _payment: PaymentDto;
  private readonly _trackingNumber: string;
  private readonly _notes: string;

  constructor(
    id: string,
    customer: CustomerBasicDto,
    vendor: UserBasicDto,
    driver: UserBasicDto | null,
    status: string,
    createdAt: Date,
    pickupLocation: PickupLocationDto,
    deliveryLocation: DeliveryLocationDto | null,
    items: ItemsDto[],
    summary: SummaryDto,
    payment: PaymentDto,
    trackingNumber: string,
    notes: string
  ) {
    this._id = id;
    this._customer = customer;
    this._vendor = vendor;
    this._driver = driver;
    this._status = status;
    this._createdAt = createdAt;
    this._pickupLocation = pickupLocation;
    this._deliveryLocation = deliveryLocation;
    this._items = items;
    this._summary = summary;
    this._payment = payment;
    this._trackingNumber = trackingNumber;
    this._notes = notes;
  }

  getId(): string {
    return this._id;
  }

  getCustomer(): CustomerBasicDto {
    return this._customer;
  }

  getVendor(): UserBasicDto {
    return this._vendor;
  }

  getDriver(): UserBasicDto | null {
    return this._driver;
  }

  getStatus(): string {
    return this._status;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getPickupLocation(): PickupLocationDto {
    return this._pickupLocation;
  }

  getDeliveryLocation(): DeliveryLocationDto | null {
    return this._deliveryLocation;
  }

  getItems(): ItemsDto[] {
    return this._items;
  }

  getSummary(): SummaryDto {
    return this._summary;
  }

  getPayment(): PaymentDto {
    return this._payment;
  }

  getTrackingNumber(): string {
    return this._trackingNumber;
  }

  getNotes(): string {
    return this._notes;
  }

  static fromEntity(order: OrderEntity): GetOrderResponseDto {
    return new GetOrderResponseDto(
      order.getId().toString(),
      CustomerBasicDto.fromEntity(order.getCustomer()),
      UserBasicDto.fromEntity(order.getVendor()),
      UserBasicDto.fromEntity(order.getDriver()) ?? null,
      order.getStatus(),
      order.getCreatedAt(),
      PickupLocationDto.fromEntity(order.getPickupLocation()),
      DeliveryLocationDto.fromEntity(order.getDeliveryLocation()) ?? null,
      order.getItems().map(ItemsDto.fromEntity),
      SummaryDto.fromEntity(order.getSummary()),
      PaymentDto.fromEntity(order.getPayment()),
      order.getTrackingNumber(),
      order.getNotes()
    );
  }
}