import { IsNotEmpty, IsNumber } from 'class-validator';

import { PickupLocationDtoService } from '../../../services/dtos/order/pickupLocation-service.dto';

export class PickUpLocationRequestDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  toServiceDto(): PickupLocationDtoService {
    return new PickupLocationDtoService(this.latitude, this.longitude);
  }
}