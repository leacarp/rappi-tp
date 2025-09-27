import { PickupLocationDtoService } from './pickupLocation.dto';
import { DeliveryLocationDtoService } from './deliveryLocation.dto';
import { itemsDtoService } from './items.dto';
import { SummaryDtoService } from './summary.dto';
import { PaymentDtoService } from './payment.dto';

export class CreateOrderDto {
  customerId: string;
  vendorId: string;
  driverId: string;
  pickupLocation: PickupLocationDtoService;
  deliveryLocation: DeliveryLocationDtoService;
  items: itemsDtoService[];
  summary: SummaryDtoService;
  payment: PaymentDtoService;
  trackingNumber: string;
  notes: string;
}
