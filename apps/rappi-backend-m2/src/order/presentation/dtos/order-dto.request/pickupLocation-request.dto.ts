import { IsNotEmpty, IsNumber } from 'class-validator';

export class PickUpLocationRequestDto{
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

}