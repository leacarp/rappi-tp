import { DeliveryLocationDto } from "./order-dto-response/deliveryLocation.dto";
import { PickupLocationDto } from "./order-dto-response/pickupLocation.dto";
import { ItemsDto } from "./order-dto-response/items.dto";
import { PaymentDto } from "./order-dto-response/payment.dto";
import { SummaryDto } from "./order-dto-response/summary.dto";
import { UserBasicDto } from "./order-dto-response/user-basic.dto";
import { OrderEntity } from "../../domain/entities/order.entity";

export class GetOrderResponseDto {
  constructor(
    private readonly _id: string,
    private readonly _customer: UserBasicDto,
    private readonly _vendor: UserBasicDto,
    private readonly _driver: UserBasicDto,
    private readonly _status: string,
    private readonly _createdAt: Date,
    private readonly _pickupLocation: PickupLocationDto,
    private readonly _deliveryLocation: DeliveryLocationDto,
    private readonly _items: ItemsDto[],
    private readonly _summary: SummaryDto,
    private readonly _payment: PaymentDto,
    private readonly _trackingNumber: string,
    private readonly _notes: string
  ) {}

  
  getId(): string {
    return this._id;
  }

  getCustomer(): UserBasicDto {
    return this._customer;
  }

  getVendor(): UserBasicDto {
    return this._vendor;
  }

  getDriver(): UserBasicDto {
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

  getDeliveryLocation(): DeliveryLocationDto {
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
      order.getId().toHexString(),
      UserBasicDto.fromEntity(order.getCustomer()),
      UserBasicDto.fromEntity(order.getVendor()),
      UserBasicDto.fromEntity(order.getDriver()),
      order.getStatus(),
      order.getCreatedAt(),
      PickupLocationDto.fromEntity(order.getPickupLocation()),
      DeliveryLocationDto.fromEntity(order.getDeliveryLocation()),
      order.getItems().map(ItemsDto.fromEntity),
      SummaryDto.fromEntity(order.getSummary()),
      PaymentDto.fromEntity(order.getPayment()),
      order.getTrackingNumber(),
      order.getNotes()
    );
  }
}
