import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeliveryLocationRequestDto{
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}