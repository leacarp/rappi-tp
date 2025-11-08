import { DeliveryLocationDto } from "./order-dto-response/deliveryLocation.dto";
import { PickupLocationDto } from "./order-dto-response/pickupLocation.dto";
import { ItemsDto } from "./order-dto-response/items.dto";
import { PaymentDto } from "./order-dto-response/payment.dto";
import { SummaryDto } from "./order-dto-response/summary.dto";
import { UserBasicDto } from "./order-dto-response/user-basic.dto";
import { CustomerBasicDto } from "./order-dto-response/customer-basic.dto";
import { GetOrderResponseService } from "../../services/dtos/get-order-response-service.dto";

export class GetOrderResponseDto {
  private readonly id: string;
  private readonly customer: CustomerBasicDto;
  private readonly vendor: UserBasicDto;
  private readonly driver: UserBasicDto | null;
  private readonly status: string;
  private readonly createdAt: Date;
  private readonly pickupLocation: PickupLocationDto;
  private readonly deliveryLocation: DeliveryLocationDto | null;
  private readonly items: ItemsDto[];
  private readonly summary: SummaryDto;
  private readonly payment: PaymentDto;
  private readonly trackingNumber: string;
  private readonly notes: string;

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
    this.id = id;
    this.customer = customer;
    this.vendor = vendor;
    this.driver = driver;
    this.status = status;
    this.createdAt = createdAt;
    this.pickupLocation = pickupLocation;
    this.deliveryLocation = deliveryLocation;
    this.items = items;
    this.summary = summary;
    this.payment = payment;
    this.trackingNumber = trackingNumber;
    this.notes = notes;
  }

  getId(): string {
    return this.id;
  }

  getCustomer(): CustomerBasicDto {
    return this.customer;
  }

  getVendor(): UserBasicDto {
    return this.vendor;
  }

  getDriver(): UserBasicDto | null {
    return this.driver;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getPickupLocation(): PickupLocationDto {
    return this.pickupLocation;
  }

  getDeliveryLocation(): DeliveryLocationDto | null {
    return this.deliveryLocation;
  }

  getItems(): ItemsDto[] {
    return this.items;
  }

  getSummary(): SummaryDto {
    return this.summary;
  }

  getPayment(): PaymentDto {
    return this.payment;
  }

  getTrackingNumber(): string {
    return this.trackingNumber;
  }

  getNotes(): string {
    return this.notes;
  }

  static fromServiceDto(serviceDto: GetOrderResponseService): GetOrderResponseDto {
    return new GetOrderResponseDto(
      serviceDto.getId(),
      CustomerBasicDto.fromServiceDto(serviceDto.getCustomer()),
      UserBasicDto.fromServiceDto(serviceDto.getVendor()),
      UserBasicDto.fromServiceDto(serviceDto.getDriver()) ?? null,
      serviceDto.getStatus(),
      serviceDto.getCreatedAt(),
      PickupLocationDto.fromServiceDto(serviceDto.getPickupLocation()),
      DeliveryLocationDto.fromServiceDto(serviceDto.getDeliveryLocation()) ?? null,
      serviceDto.getItems().map(ItemsDto.fromServiceDto),
      SummaryDto.fromServiceDto(serviceDto.getSummary()),
      PaymentDto.fromServiceDto(serviceDto.getPayment()),
      serviceDto.getTrackingNumber(),
      serviceDto.getNotes()
    );
  }
}