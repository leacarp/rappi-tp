import { OrderEntity } from "../../domain/entities/order.entity";
import { CustomerBasicService } from "./order-response/customer-basic-service.dto";
import { UserBasicService } from "./order-response/user-basic-service.dto";
import { DeliveryLocationService } from "./order-response/delivery-location-service.dto";
import { PickupLocationService } from "./order-response/pickup-location-service.dto";
import { ItemsServiceResponse } from "./order-response/items-service-response.dto";
import { SummaryServiceResponse } from "./order-response/summary-service-response.dto";
import { PaymentServiceResponse } from "./order-response/payment-service-response.dto";

export class GetOrderResponseService {
  private readonly _id: string;
  private readonly _customer: CustomerBasicService;
  private readonly _vendor: UserBasicService;
  private readonly _driver: UserBasicService | null;
  private readonly _status: string;
  private readonly _createdAt: Date;
  private readonly _pickupLocation: PickupLocationService;
  private readonly _deliveryLocation: DeliveryLocationService | null;
  private readonly _items: ItemsServiceResponse[];
  private readonly _summary: SummaryServiceResponse;
  private readonly _payment: PaymentServiceResponse;
  private readonly _trackingNumber: string;
  private readonly _notes: string;

  constructor(
    id: string,
    customer: CustomerBasicService,
    vendor: UserBasicService,
    driver: UserBasicService | null,
    status: string,
    createdAt: Date,
    pickupLocation: PickupLocationService,
    deliveryLocation: DeliveryLocationService | null,
    items: ItemsServiceResponse[],
    summary: SummaryServiceResponse,
    payment: PaymentServiceResponse,
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

  getCustomer(): CustomerBasicService {
    return this._customer;
  }

  getVendor(): UserBasicService {
    return this._vendor;
  }

  getDriver(): UserBasicService | null {
    return this._driver;
  }

  getStatus(): string {
    return this._status;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getPickupLocation(): PickupLocationService {
    return this._pickupLocation;
  }

  getDeliveryLocation(): DeliveryLocationService | null {
    return this._deliveryLocation;
  }

  getItems(): ItemsServiceResponse[] {
    return this._items;
  }

  getSummary(): SummaryServiceResponse {
    return this._summary;
  }

  getPayment(): PaymentServiceResponse {
    return this._payment;
  }

  getTrackingNumber(): string {
    return this._trackingNumber;
  }

  getNotes(): string {
    return this._notes;
  }

  static fromEntity(order: OrderEntity): GetOrderResponseService {
    return new GetOrderResponseService(
      order.getId().toString(),
      CustomerBasicService.fromEntity(order.getCustomer()),
      UserBasicService.fromEntity(order.getVendor()) ?? null,
      UserBasicService.fromEntity(order.getDriver()) ?? null,
      order.getStatus(),
      order.getCreatedAt(),
      PickupLocationService.fromEntity(order.getPickupLocation()),
      DeliveryLocationService.fromEntity(order.getDeliveryLocation()) ?? null,
      order.getItems().map(ItemsServiceResponse.fromEntity),
      SummaryServiceResponse.fromEntity(order.getSummary()),
      PaymentServiceResponse.fromEntity(order.getPayment()),
      order.getTrackingNumber(),
      order.getNotes()
    );
  }
}