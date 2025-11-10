import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PickupLocationDtoService } from '../../../services/dtos/order/pickupLocation-service.dto';

export class PickUpLocationRequestDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  toServiceDto(): PickupLocationDtoService {
    return new PickupLocationDtoService(this.latitude, this.longitude);
  }
}