import { IsString } from "class-validator";

export class AcceptOrderDto {
  @IsString()
  driverId: string;
}