import { DeliveryLocationDto } from "./order/deliveryLocation.dto";
import { PickupLocationDto } from "./order/pickupLocation.dto";
import { ItemsDto } from "./order/items.dto";
import { PaymentDto } from "./order/payment.dto";
import { SummaryDto } from "./order/summary.dto";
import { UserBasicDto } from "./order/user-basic.dto";

export class GetOrderResponseDto{
    id: string;
    customer: UserBasicDto;
    vendor: UserBasicDto;
    driver: UserBasicDto;
    status: string;
    createdAt: Date;
    pickupLocation: PickupLocationDto;
    deliveryLocation: DeliveryLocationDto;
    items: ItemsDto[];
    summary: SummaryDto;
    payment: PaymentDto;
    trackingNumber: string;
    notes: string;
}