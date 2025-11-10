import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AcceptOrderDto {
  @ApiProperty({ type: String })
  @IsString()
  driverId: string;
}